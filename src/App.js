import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppBar from "./components/AppBar";
import List from "./components/List";
import Add from "./components/Add";
import View from "./components/View";
import Edit from "./components/Edit";
import { useState } from "react";

export default function App() {
  const [actions, setActions] = useState(false);
  return (
    <>
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/list" />}></Route>
          <Route
            path="/list"
            element={<List actions={actions} setActions={setActions} />}
          ></Route>
          <Route
            path="/add"
            element={<Add actions={actions} setActions={setActions} />}
          ></Route>
          <Route
            path="/view/:contactID"
            element={<View actions={actions} />}
          ></Route>
          <Route
            path="/edit/:contactID"
            element={<Edit actions={actions} setActions={setActions} />}
          ></Route>
        </Routes>
      </Container>
    </>
  );
}
