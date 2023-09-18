import React, { useState } from "react";
import cloudysun from "./../img/cloudysun.png";
import clouds from "./../img/clouds.png";

import { kelvinToCelsius } from "./../utils/utils";

function Card(props: any) {
  const { data } = props;

  return (
    <div className="flex flex-col items-center md:w-1/5 gap-2 border-b-2 sm:border-b-0 border-gray-200 border-dotted h-full justify-center">
      <h2 className="text-center uppercase text-xl md:text-2xl">
        {data.city.name}
      </h2>
      <img
        className="w-1/2"
        src={data.list[0].clouds.all > 50 ? clouds : cloudysun}
      />
      <span className="text-xl md:text-2xl">
        {kelvinToCelsius(data.list[0].main.temp)}
      </span>
    </div>
  );
}

export default Card;
