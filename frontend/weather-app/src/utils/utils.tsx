var formattedTime: string;

export function kelvinToCelsius(kelvin: number) {
  const celsius = kelvin - 273.15;
  console.log(celsius.toFixed(1) + " ºC");
  return `${celsius.toFixed(1)} ºC`;
}

export function checkName(cityName: string | undefined) {
  if (cityName?.toLowerCase().includes("district")) {
    cityName = cityName.replace(/district/i, "").trim();
  }
  return cityName;
}

export function formatUnixTimestamp(dateToFormat: number) {
  const timestampInMilliseconds = dateToFormat * 1000;
  const date = new Date(timestampInMilliseconds);

  const abbreviatedWeekdayNames = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  const dayOfWeek = abbreviatedWeekdayNames[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();

  const hourInUtcPlus1 = date.getUTCHours();
  const minute = date.getUTCMinutes();

  formattedTime = `${hourInUtcPlus1.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  return `${dayOfWeek} ${dayOfMonth}, ${formattedTime}`;
}

export function getHours() {
  return `${formattedTime}`;
}
