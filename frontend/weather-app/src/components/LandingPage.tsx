import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import rainyAnimation from "../assets/animation_rainy.json";
import sunnyAnimation from "../assets/animation_sunny.json";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const containerRef = useRef<any>(null);
  const { loginWithRedirect } = useAuth0();
  const currentAnimationRef = useRef<AnimationItem | null>(null);
  const [isSunnyAnimation, setIsSunnyAnimation] = useState(false);

  useEffect(() => {
    loadAnimation(isSunnyAnimation);

    return () => {
      if (currentAnimationRef.current) {
        currentAnimationRef.current.destroy();
      }
    };
  }, [isSunnyAnimation]);

  const loadAnimation = (isSunny: boolean) => {
    if (isSunny) {
      currentAnimationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        animationData: sunnyAnimation,
        loop: false,
        autoplay: true,
      });
    } else {
      currentAnimationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        animationData: rainyAnimation,
        loop: false,
        autoplay: true,
      });
    }

    // Add an event listener for animation completion
    if (currentAnimationRef.current) {
      currentAnimationRef.current.addEventListener(
        "complete",
        handleAnimationComplete
      );
    }
  };

  const handleAnimationComplete = () => {
    // Toggle between animations when the current animation completes
    setIsSunnyAnimation((prevIsSunny) => !prevIsSunny);
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-teal-500">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="at-item text-white mb-4 text-3xl font-thin leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">
            Welcome to WeatherApp
          </h1>
          <div className="w-1/3" ref={containerRef}></div>
          <button
            onClick={() => handleLogin()}
            type="button"
            className="self-end mx-2 text-cyan-500 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Go to login page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
