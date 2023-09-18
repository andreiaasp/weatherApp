import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/Loader";
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/auth/authentication-guard";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

export default function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<AuthenticationGuard component={Home} />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
