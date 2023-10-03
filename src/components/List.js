import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRequest from "../apiRequest";

export default function List({ actions, setActions }) {
  const [dataList, setDataList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("https://json-server-dj5h.onrender.com/contacts");
      if (!res.ok) alert("some problem with api please reload");
      const data = await res.json();
      setDataList(data);
      setIsLoading(false);
    }
    fetchData();
  }, [actions]);
  return (
    <div>
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Control type="text" placeholder="Seach" />
          </Form>
        </Col>
        <Col xs={6} className="text-end">
          <Link to="/add">
            <Button variant="success">Create</Button>
          </Link>
        </Col>
      </Row>
      {isloading ? (
        <Row>
          <h2 className="text-center mt-5">Please Wait.....</h2>
        </Row>
      ) : (
        <Row className="mt-4">
          {dataList.map((pre) => (
            <ProfileCard data={pre} key={pre.id} setActions={setActions} />
          ))}
        </Row>
      )}
    </div>
  );
}

function ProfileCard({ data, setActions }) {
  function handleDelete(id) {
    const deleteOption = {
      method: "DELETE",
    };
    apiRequest(
      `https://json-server-dj5h.onrender.com/contacts/${id}`,
      deleteOption
    );
    setActions((pre) => !pre);
  }
  return (
    <Col md={6} className=" my-2">
      <Card>
        <Card.Body>
          <Row className="align-items-center justify-content-around">
            <Col md={3}>
              <img
                src={data.photo}
                alt=""
                className="img-fluid rounded-circle"
              />
            </Col>
            <Col md={7}>
              <ListGroup className="pt-3">
                <ListGroup.Item className="row">
                  <Col>Name: </Col>
                  <Col className="fw-bold">{data.name}</Col>
                </ListGroup.Item>
                <ListGroup.Item className="row">
                  <Col>Mobile: </Col>
                  <Col className="fw-bold">{data.mobile}</Col>
                </ListGroup.Item>
                <ListGroup.Item className="row">
                  <Col>Email ID: </Col>
                  <Col className="fw-bold">{data.email}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col
              md={2}
              className="d-flex flex-md-column align-items-center justify-content-center pt-3 pt-md-0"
            >
              <Link
                className="btn btn-warning mb-md-1 me-md-0 me-1"
                to={`/view/${data.id}`}
              >
                <i className="bi bi-eye-fill"></i>
              </Link>
              <Link
                className="btn btn-primary mb-md-1 me-md-0 me-1"
                to={`/edit/${data.id}`}
              >
                <i className="bi bi-pencil-square"></i>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(data.id)}>
                <i className="bi bi-trash-fill"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
