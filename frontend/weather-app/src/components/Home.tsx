import { useEffect, useState } from "react";
import cloudy from "./../img/cloudy.png";
import loadingIcon from "./../img/loading.png";
import Card from "./Card";
import axios from "axios";
import { CityObj } from "./../model/City";
import {
  getHours,
  checkName,
  kelvinToCelsius,
  formatUnixTimestamp,
} from "./../utils/utils";

const Home = () => {
  const [data, setData] = useState<CityObj[]>([]);
  const [city, setCity] = useState<CityObj>();
  const [isLoading, setIsLoading] = useState(true);

  const cityIds = [2267094, 2267056, 2740636, 2735941, 2268337];

  function fetchCities() {
    const baseUrl = "http://localhost:8080/api/weather/";
    const targetCityId = 2267056;
    const otherCities: CityObj[] = [];

    Promise.all(
      cityIds.map((cityId) => {
        const apiUrl = baseUrl + cityId;

        return axios
          .get(apiUrl)
          .then((response) => {
            console.log(response);
            const cityData = response.data.city;

            if (cityData?.id === targetCityId) {
              setCity(response.data);
            } else {
              otherCities.push(response.data);
            }

            setIsLoading(false);
          })
          .catch((error) => {
            console.error(
              "Error fetching data for city ID",
              cityId,
              ":",
              error
            );
          });
      })
    )
      .then(() => {
        setIsLoading(false);
        setData(otherCities);
        console.log(city);
        console.log(otherCities);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div
      id="container"
      className={`h-full  rounded-2xl flex flex-col shadow-xl ${
        isLoading
          ? "bg-white justify-center"
          : "bg-gradient-to-r from-cyan-500 to-teal-500"
      }`}
    >
      {isLoading ? (
        // Render loading icon when isLoading is true
        <img
          className="w-1/4 self-center"
          src={loadingIcon}
          alt="loading icon"
        />
      ) : (
        <>
          <div id="upper-div" className="flex-1">
            <div
              id="upper-div"
              className="justify-items-center grid sm:grid-cols-3 sm:grid-cols-1 relative top-10 flex-1"
            >
              <div className="flex flex-col pb-3 sm:pb-0 col-span-1 self-center text-white text-2xl">
                <strong className="uppercase">
                  {formatUnixTimestamp(city?.list[0].dt)}
                </strong>
                <span>Today in {checkName(city?.city.name)}</span>
              </div>
              <img className="w-1/2" src={cloudy} alt="weather icon" />
              <div className="sm:justify-self-start self-center sm:border-l-2 sm:border-white sm:border-dotted ">
                <p className="font-bold text-5xl lg:text-8xl sm:text-5xl text-white col-span-1 p-8 sm:p-10">
                  {kelvinToCelsius(city?.list[0].main.temp)}
                </p>
              </div>
            </div>
          </div>
          <div id="lower-div " className="flex-1 p-10 lg:p-20">
            <div className="bg-white rounded-xl h-full flex flex-col shadow-lg shadow-sky-900/50">
              <h2 className="text-sky-900 font-bold text-2xl p-4 pb-0 text-center">
                Other Locations
              </h2>
              <p className="text-gray-400 font-bold text-sm sm:txt-lg p-4 pt-0 text-center">
                {getHours()}
              </p>
              <div className="mx-10 mb-5 flex-1 sm:h-1/3 flex flex-col sm:flex-row items-center justify-center">
                {data.map((item) => {
                  return <Card key={item.city.id} data={item} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
