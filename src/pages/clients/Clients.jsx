import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

export default function Clients() {
  const [customers, setCustomers] = useState([]);
  const getAllCustomers = async () => {
    try {
      const res = await fetch("https://ticket-support-system-backend-4u1x.vercel.app/api/getAllCustomers", {
        method: "GET",
      });
      const response = await res.json();
      // console.log("GetAllCustomers resp >> ", response.users);
      setCustomers(response.users);
    } catch (error) {
      console.log("error >> ", error);
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  
  return (
    <Container fluid className="pt-5">
      <Container className="pt-4">
        <Container className="d-flex justify-content-between align-items-center flex-wrap my-3">
          <h4 className="">Clients</h4>
        </Container>
        <Container className="px-0 pt-3 border-top">
          {customers.length > 0 ? (
            <>
              {
                <Table striped bordered className="text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Service Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => {
                      return (
                        <tr key={c._id}>
                          <td>1</td>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.phoneNumber}</td>
                          <td>Pending</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            </>
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </Container>
  );
}
