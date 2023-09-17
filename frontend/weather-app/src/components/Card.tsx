import React, { useState } from "react";
import cloudy from "./../img/cloudy.png";

function NavBar() {
  return (
    <div
      className="flex flex-col items-center w-1/6 gap-2 border-s-2 border-gray-200 border-dotted h-fit"
      dir="rtl"
    >
      <h2 className="text-center uppercase">Lisbon</h2>
      <img className="w-1/2" src={cloudy} />
      <span>30ºC</span>
    </div>
  );
}

export default NavBar;
