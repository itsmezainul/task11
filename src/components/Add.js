import { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRequest from "../apiRequest";

export default function Add() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const id = crypto.randomUUID();
  const [saved, setSeved] = useState(false);
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSeved(true);
    const newItem = {
      id,
      name,
      photo: url ? url : `https://i.pravatar.cc/?u=${id}`,
      mobile,
      email,
      company,
      title,
      group,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
    await apiRequest(
      "https://json-server-dj5h.onrender.com/contacts",
      postOptions
    );
    setName("");
    setUrl("");
    setMobile("");
    setEmail("");
    setCompany("");
    setTitle("");
    setGroup("");
    setSeved(false);
    setShow(true);
  }

  return (
    <Form
      className="text-center mx-auto"
      style={{
        maxWidth: "500px",
      }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h3>Create Contact</h3>
      <Form.Control
        type="text"
        placeholder="Name"
        className="mt-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Photo URL"
        className="mt-3"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Form.Control
        type="number"
        placeholder="Mobile Number"
        className="mt-3"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Form.Control
        type="email"
        placeholder="Email Address"
        className="mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Company"
        className="mt-3"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Title"
        className="mt-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.Select
        className="mt-3"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option value="">Select Group</option>
        <option value="Colleague">Colleague</option>
        <option value="Friends">Friends</option>
        <option value="Family">Family</option>
        <option value="School">School</option>
        <option value="Work">Work</option>
      </Form.Select>
      <div className="mt-3">
        <Button type="submit">{saved ? "Saving..." : "Submit"}</Button>
        <Link to="/" className="ms-3">
          <Button variant="dark">Cancel</Button>
        </Link>
      </div>
      <OperationAlert setShow={setShow} show={show} />
    </Form>
  );
}

function OperationAlert({ setShow, show }) {
  return (
    <div className="position-fixed top-0 end-0 mt-5 me-5">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Contact Saved</strong>
        </Toast.Header>
        <Toast.Body>Contact Has been saved, Please check home page</Toast.Body>
      </Toast>
    </div>
  );
}
