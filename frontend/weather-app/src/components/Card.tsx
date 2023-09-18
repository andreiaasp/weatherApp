import React, { useState } from "react";
import cloudy from "./../img/cloudy.png";

import { kelvinToCelsius } from "./../utils/utils";

function Card(props: any) {
  const { data } = props;

  return (
    <div className="flex flex-col items-center md:w-1/6 gap-2 border-b-2 sm:border-b-0 sm:border-r-2 pb-2 border-gray-200 border-dotted   h-fit">
      <h2 className="text-center uppercase">{data.city.name}</h2>
      <img className="w-1/2" src={cloudy} />
      <span>{kelvinToCelsius(data.list[0].main.temp)}</span>
    </div>
  );
}

export default Card;