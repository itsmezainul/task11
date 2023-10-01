import { useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import apiRequest from "../apiRequest";

export default function Edit() {
  const { contactID } = useParams();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchSingleData() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/contacts/${contactID}`);
      const data = await res.json();
      setName(data.name);
      setUrl(data.photo);
      setMobile(data.mobile);
      setEmail(data.email);
      setCompany(data.company);
      setTitle(data.title);
      setGroup(data.group);
      setIsLoading(false);
    }
    fetchSingleData();
  }, [contactID]);

  async function handleEdit(e) {
    setSaved(true);
    e.preventDefault();
    const newItem = {
      name,
      photo: url ? url : `https://i.pravatar.cc/?u=${contactID}`,
      mobile,
      email,
      company,
      title,
      group,
    };
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newItem }),
    };
    await apiRequest(
      `http://localhost:9000/contacts/${contactID}`,
      updateOption
    );
    setSaved(false);
    setShow(true);
  }

  return (
    <Form
      className="text-center mx-auto"
      style={{
        maxWidth: "500px",
      }}
      onSubmit={(e) => handleEdit(e)}
    >
      <h3>Edit Contact</h3>
      <Form.Control
        type="text"
        placeholder="Name"
        className="mt-3"
        value={isloading ? "Please wait" : name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Photo URL"
        className="mt-3"
        value={isloading ? "Please wait" : url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Form.Control
        type="number"
        placeholder="Mobile Number"
        className="mt-3"
        value={isloading ? "00000000000" : mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Form.Control
        type="email"
        placeholder="Email Address"
        className="mt-3"
        value={isloading ? "Please wait" : email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Company"
        className="mt-3"
        value={isloading ? "Please wait" : company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Title"
        className="mt-3"
        value={isloading ? "Please wait" : title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.Select
        className="mt-3"
        value={isloading ? "Please wait" : group}
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
        <Button type="submit">{saved ? "Saving..." : "Update"}</Button>
        <Link to="/" className="ms-3">
          <Button variant="dark">Cancel</Button>
        </Link>
      </div>
      <OperationAlert show={show} setShow={setShow} />
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
          <strong className="me-auto">Contact Updated</strong>
        </Toast.Header>
        <Toast.Body>
          Contact Has been Updated, Please check home page
        </Toast.Body>
      </Toast>
    </div>
  );
}
