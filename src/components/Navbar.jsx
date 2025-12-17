import "./defcss.css"
import "./Navbar.css";
import Button from "./Button";
export default function Navbar(){
    return(
    <div className="navbar">
        <div className="home"><a href="#">RECIPIE</a></div>
        <div className="nav-items">
            <ul>
                <a href="#"><li>All Recipes</li></a>
                <a href="#"><li>My Recipes</li></a>
                <a href="#"><li>Add Recipes</li></a>
                <a href="#"><li><Button info="Login/Signup" color="rgb(255, 115, 0)"/></li></a>
            </ul>
        </div>
    </div>
    )
}