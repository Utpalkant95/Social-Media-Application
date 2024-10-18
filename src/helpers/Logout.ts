import Cookies from "js-cookie";
const Logout = () => {
  Cookies.remove("accessToken");
  window.location.reload();
};

export default Logout;