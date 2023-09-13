import * as React from "react";
import { Link } from "react-router-dom";
import Main from "./components/Main";

export default function App() {
  return (
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">Welcome to WeatherApp!</p>
        <div className="text-gray-500 text-lg">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <hr />
          <Main />
        </div>
      </div>
    </>
  );
}
