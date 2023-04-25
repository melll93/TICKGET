import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialRedirect = () => {
  const navigate = useNavigate();

  const path = window.location.pathname.split("/");
  const access_token = path[3];
  window.localStorage.setItem("access_token", access_token);

  useEffect(() => {
    navigate("/");
  }, []);
};

export default SocialRedirect;
