import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Logout = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-white p-2 shadow-lg text-sm sm:text-md font-medium"
    >
      Sign Out
    </button>
  );
};
