import { Link } from "react-router-dom";
import search from "../assets/search.png";
import gymshark from "../assets/gymshark.png";
import cart from "../assets/cart.png";
import SideBar from "./sidebar";
import "../styles/navbar.css";

export default function NavBar() {

  return (
 <>
  <nav className="navbar--nav">
    <span>
      <SideBar/>
      <Link to="/search" className="navbar--search--link"> <img src={search} className="search--img"/> </Link> 
      </span>
      <Link to="" className="navbar--logo--link"><img src={gymshark} className="navbar--logo"/> </Link>
      <Link to="/mycart" className="navbar--cart--link"> <img src={cart} className="navbar--cart--img"/> </Link>
    </nav>
    </>
  );
}
