import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

export default function Chat() {
  const [ticketInfo, setTicketInfo] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));

  const fetchCustomerChat = async () => {
    const _id = JSON.parse(localStorage.getItem("ticketId"));
    try {
      const res = await fetch(`https://ticket-support-system-backend-4u1x.vercel.app/api/getChats/${_id}`, {
        method: "GET",
      });
      const response = await res.json();
      // console.log("fetchCustomerChat >> ", response);
      setTicketInfo(response.ticket);
    } catch (error) {
      console.log("fetchCustomerChat error >>> ", error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const _id = JSON.parse(localStorage.getItem("ticketId"));
      const res = await fetch(
        `https://ticket-support-system-backend-4u1x.vercel.app/api/getChatMessages/${_id}`,
        {
          method: "GET",
        }
      );
      const response = await res.json();
      // console.log("fetchChatMessages response >>> ", response);
      setMessages(response.messages);
    } catch (error) {
      console.log("fetchChatMessages error >> ", error);
    }
  };

  useEffect(() => {
    fetchCustomerChat();
    fetchChatMessages();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const _id = JSON.parse(localStorage.getItem("ticketId"));
    try {
      const res = await fetch(
        "https://ticket-support-system-backend-4u1x.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: loggedInUser?.user?._id,
            ticketId: _id,
            message: msg,
          }),
        },
        setMsg("")
      );
      const response = await res.json();
      console.log("Msg response >> ", response);
    } catch (error) {
      console.log("sendMessage error >> ", error);
    }
  };

  const closeTicket = async () => {
    const _id = JSON.parse(localStorage.getItem("ticketId"));
    try {
      const res = await fetch(`https://ticket-support-system-backend-4u1x.vercel.app/api/closeTicket/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketStatus: "Closed" }),
      });
      const response = await res.json();
      console.log("ticketClose response >>> ", response);
    } catch (error) {
      console.log("ticketClose error >>> ", error);
    }
  };

  return (
    <Container
      className="pt-5 d-flex flex-column align-items-center justify-content-between"
      style={{ height: "90vh" }}
    >
      {/* Messages */}
      <Container
        className="py-3"
        style={{ height: "84%", overflowY: "scroll" }}
      >
        <Container className="border-bottom mt-3 mb-3 py-2">
          <h6 className="fw-bold">
            Subject:
            <span className="fw-normal ms-1">{ticketInfo?.problem}</span>
          </h6>
          <h6 className="fw-bold">
            Ref. Number:
            <span className="fw-normal ms-1">{ticketInfo?.referenceNum}</span>
          </h6>
          <h6 className="fw-bold">
            Status:
            <span className="fw-normal ms-1">{ticketInfo?.ticketStatus}</span>
          </h6>
          <Button variant="danger" size="sm" onClick={closeTicket}>
            Close Ticket
          </Button>
        </Container>
        <h2>Messages: </h2>
        {messages.length > 0 ? (
          <>
            {messages.map(({ _id, customerId, message }) => {
              if (customerId === loggedInUser?.user?._id) {
                return (
                  <Container
                    key={_id}
                    className="w-75 rounded text-light bg-primary float-end mb-3 py-2"
                  >
                    {message}
                  </Container>
                );
              } else {
                return (
                  <Container
                    key={_id}
                    className="w-75 rounded text-dark float-start mb-3 py-2"
                    style={{ background: "rgb(222, 220, 220)" }}
                  >
                    {message}
                  </Container>
                );
              }
            })}
          </>
        ) : (
          <></>
        )}
      </Container>
      {/* Message Input */}
      <Container className="border-top pt-2" style={{ height: "16%" }}>
        <Form>
          <Form.Group className="d-flex">
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Type your message..."
              className="w-100 me-1"
              style={{ height: "100%" }}
              name="customerMessage"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              className="bg-light border-0 text-dark fw-semibold"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}
