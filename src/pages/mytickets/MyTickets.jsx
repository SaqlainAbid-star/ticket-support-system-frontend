import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketModal from "../../components/modal/TicketModal";
import "./Tickets.css";

export default function MyTickets() {
  const [modalShow, setModalShow] = useState(false);

  const [customerTickets, setCustomerTickets] = useState([]);
  const [filterCustomerTickets, setFilterCustomerTickets] = useState([]);
  const [search, setSearch] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const _id = loggedInUser?.user?._id;
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `https://ticket-support-system-backend-4u1x.vercel.app/api/getCustomerTickets/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: loggedInUser?.user?._id }),
        }
      );

      // const res = await fetch("http://localhost:3001/api/getAllTickets", {
      //   method: "GET",
      // });

      const response = await res.json();
      // console.log("fetchTickets >> ", response);
      setCustomerTickets(response.allTickets);
      setFilterCustomerTickets(response.allTickets)
    } catch (error) {
      console.log("fetchTickets error >> ", error);
    }
  };

  const fetchCustomerChat = async (_id) => {
    navigate(`/customer-chat/${_id}`);
    localStorage.setItem("ticketId", JSON.stringify(_id));
    // try {
    //   const res = await fetch(`http://localhost:3001/api/getChats/${_id}`, {
    //     method: "GET",
    //   });
    //   const response = await res.json();
    //   console.log("fetchCustomerChat >> ", response);
    // } catch (error) {
    //   console.log("fetchCustomerChat error >>> ", error);
    // }
  };

  useEffect(() => {
    fetchTickets();
  },[search,modalShow]);

  const searchTicket = () => {
    // const res = await fetch("http://localhost:3001/api/searchCustomerByName", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ search }),
    // });
    // const searchResp = await res.json();
    // console.log("searchResp >> ", searchResp);

    if (search !== '') {
      setFilterCustomerTickets(
        filterCustomerTickets.filter(i => i.referenceNum == search)
      )
      console.log(filterCustomerTickets);
    } else {
      setFilterCustomerTickets(customerTickets)
    }

  };

  return (
    <Container className="py-5">
      <Container className="pt-5 d-flex justify-content-between align-items-center flex-wrap">
        {/* <h4 className="">Tickets</h4> */}
        <Form className="mb-3">
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search Reference No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onChange={(e) => searchCustomer(e.target.value)}
            />
            <Button
              style={{
                background: "transparent",
                border: "none",
                color: "black",
              }}
              onClick={() => searchTicket()}
            >
              Search
            </Button>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Create a ticket
        </Button>
      </Container>
      <Container className="my-3 px-0">
        <TicketModal show={modalShow} onHide={() => setModalShow(false)} />
        {filterCustomerTickets.length > 0 ? (
          <>
            <Table striped bordered className="text-center">
              <thead>
                <tr>
                  <th>Refernce Number</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filterCustomerTickets.map(
                  ({
                    _id,
                    customerName,
                    date,
                    problem,
                    ticketStatus,
                    referenceNum,
                  }) => {
                    const isPending = ticketStatus.toLowerCase() === 'pending';
                    return (
                      <tr key={_id} className={isPending ? 'pending-row' : ''} onClick={() => fetchCustomerChat(_id)}>
                        <td>

                          {referenceNum}</td>
                        <td>
                          <button
                            className="border-0 ticketBtn bg-none"
                            onClick={() => fetchCustomerChat(_id)}
                          >
                            {problem}
                          </button>
                        </td>
                        <td>{ticketStatus}</td>
                        <td>{date}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Container>
  );
}
