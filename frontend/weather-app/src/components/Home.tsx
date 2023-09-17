import cloudy from "./../img/cloudy.png";
import Card from "./Card";

const Home = () => {
  return (
    <div
      id="container"
      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex flex-col shadow-xl"
    >
      <div id="upper-div" className="flex-1">
        <div
          id="upper-div"
          className="justify-items-center grid grid-cols-3 relative top-10 flex-1"
        >
          <div className="flex flex-col col-span-1 justify-self-end self-center text-white text-2xl">
            <strong>SUN 24</strong>
            <span>Today in Lisbon</span>
          </div>
          <img className="w-1/2" src={cloudy} />
          <div className="justify-self-start self-center border-l-2 border-white border-dotted ">
            <p className="font-bold text-8xl text-white col-span-1 p-10">
              22ºC
            </p>
          </div>
        </div>
      </div>

      <div id="lower-div " className="flex-1 p-20">
        <div className="bg-white rounded-xl h-full flex flex-col shadow-lg shadow-sky-900/50">
          <h2 className="text-sky-900 font-bold text-2xl p-4 self-center">
            Other Locations
          </h2>
          <div className="bg-red mx-10 mb-5 flex-1 h-1/3 flex flex-row items-center justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
