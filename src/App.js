import "./App.css";
import User from "./components/User/User";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/users/:userId" element={<User />}></Route>
          <Route exact path="/auth" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
