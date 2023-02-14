import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Room from "./components/Page/Room";
import Home from "./components/Page/Home";
import Character from "./components/Page/Character";

function App() {
  // const toRoom = () => {
  //   ReactDOM.render(<Room />, document.getElementById("root"));

  // };

  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/room" element={<Room />} />
      </Routes>
      <Routes>
        <Route path="/character" element={<Character />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
