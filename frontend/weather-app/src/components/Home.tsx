import { useEffect, useState } from "react";
import cloudysun from "./../img/cloudysun.png";
import clouds from "./../img/clouds.png";
import loadingIcon from "./../img/loading.png";
import Card from "./Card";
import { Logout } from "./Logout";
import axios from "axios";
import { CityObj } from "./../model/City";
import {
  getHours,
  checkName,
  kelvinToCelsius,
  formatUnixTimestamp,
} from "./../utils/utils";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState<CityObj[]>([]);
  const [city, setCity] = useState<CityObj>();
  const [isLoading, setIsLoading] = useState(true);

  const cityIds = [2267094, 2267056, 2740636, 2735941, 2268337];

  async function fetchCities() {
    const domain = "dev-byh400on787b1fda.us.auth0.com";

    const baseUrl = "http://localhost:8080/api/weather/";
    const targetCityId = 2267056;
    const otherCities: CityObj[] = [];

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `http://localhost:8080/api`,
        scope: "read:weather",
      },
    });

    Promise.all(
      cityIds.map((cityId) => {
        const apiUrl = baseUrl + cityId;

        return axios
          .get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
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
    <div id="page" className="bg-sky-100 sm:h-screen py-8 px-16">
      <div
        id="container"
        className={`h-full  rounded-2xl flex flex-col shadow-xl ${
          isLoading
            ? "bg-white justify-center"
            : "bg-gradient-to-r from-cyan-500 to-teal-500"
        }`}
      >
        {isLoading ? (
          <img
            className="w-1/4 self-center"
            src={loadingIcon}
            alt="loading icon"
          />
        ) : (
          <>
            <div id="upper-div" className="flex-1 flex flex-col">
              <div className="h-1/6 m-3 ">
                <Logout />
              </div>
              <div
                id="weather-main"
                className="justify-items-center grid sm:grid-cols-3 sm:grid-cols-1 relative flex-1 mx-6"
              >
                <div className="flex flex-col pb-3 sm:pb-0 col-span-1 self-center text-white text-2xl">
                  <strong className="uppercase">
                    {formatUnixTimestamp(city?.list[0].dt)}
                  </strong>
                  <span>Today in {checkName(city?.city.name)}</span>
                </div>
                <img
                  className="w-1/2 self-center"
                  src={city?.list[0].clouds.all > 50 ? clouds : cloudysun}
                  alt="weather icon"
                />
                <div className="sm:justify-self-start self-center sm:border-l-2 sm:border-white sm:border-dotted ">
                  <p className="font-bold text-3xl md:text-4xl lg:text-6xl text-white col-span-1 p-6 lg:p-10">
                    {kelvinToCelsius(city?.list[0].main.temp)}
                  </p>
                </div>
              </div>
            </div>
            <div id="lower-div " className="h-2/3 my-5 mx-10">
              <div className="bg-white rounded-xl h-full flex flex-col shadow-lg shadow-sky-900/50">
                <h2 className="text-sky-900 font-bold text-2xl p-4 pb-0 text-center">
                  Other Locations
                </h2>
                <p className="text-gray-400 font-bold text-sm sm:txt-lg p-4 pt-0 text-center">
                  {getHours()}
                </p>
                <div className="mx-10 mb-5 flex-1 sm:h-1/3 flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-4">
                  {data.map((item) => {
                    return <Card key={item.city.id} data={item} />;
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
