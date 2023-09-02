import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function TicketModal(props) {
  const [ticketDetail, setTicketDetail] = useState({
    customerName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    problem: "",
  });
  const { customerName, customerEmail, customerPhoneNumber, problem } =
    ticketDetail;
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTicketDetail((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhoneNumber || !problem) {
      alert("Please fill in all the fields");
    } else {
      try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = month + "/" + day + "/" + year;
        const res = await fetch("https://ticket-support-system-backend-4u1x.vercel.app/api/createTicket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: loggedInUser?.user?._id,
            customerName,
            customerEmail,
            customerPhoneNumber,
            problem,
            date: currentDate,
            ticketStatus: "Pending",
          }),
        });
        const response = await res.json();
        console.log("TicketCreated resp >> ", response);
        alert(response.status);
        setTicketDetail({
          customerName: "",
          customerEmail: "",
          customerPhoneNumber: "",
          problem: "",
        });
      } catch (error) {
        console.log("createTicket function error >> ", error);
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="px-5">
        <Modal.Title id="contained-modal-title-vcenter">
          Create Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              name="customerName"
              value={customerName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Problem</Form.Label>
            <Form.Control
              type="text"
              name="problem"
              value={problem}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control
              type="email"
              name="customerEmail"
              value={customerEmail}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="customerPhoneNumber"
              value={customerPhoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="px-5">
        <Button variant="danger" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="success" type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
