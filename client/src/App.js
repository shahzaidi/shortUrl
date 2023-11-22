import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shorturl from "./components/Shorturl";
// import Register from "./components/Register";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shorturl" element={<Shorturl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
