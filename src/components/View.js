import { Col, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function View() {
  const [singleData, setSingleData] = useState([]);
  const { contactID } = useParams();
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchSingleData() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/contacts/${contactID}`);
      const data = await res.json();
      setSingleData(data);
      setIsLoading(false);
    }
    fetchSingleData();
  }, [contactID]);
  return (
    <Row
      style={{
        minHeight: "90vh",
      }}
      className="align-items-center"
    >
      <Col md={4}>
        <img
          src={singleData.photo}
          alt=""
          className="img-fluid rounded-circle"
        />
      </Col>
      <Col md={8}>
        <ListGroup>
          <ListGroup.Item className="fs-2">
            Name:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.name}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="fs-2">
            Mobile:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.mobile}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="fs-2">
            Email:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.email}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="fs-2">
            Company:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.company}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="fs-2">
            Title:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.title}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="fs-2">
            Group:{" "}
            <span className="fw-bold">
              {isloading ? "Loading...." : singleData.group}
            </span>
          </ListGroup.Item>
        </ListGroup>
        <Link to="/" className="btn btn-warning fw-bold mt-2 fs-3">
          Back
        </Link>
      </Col>
    </Row>
  );
}
