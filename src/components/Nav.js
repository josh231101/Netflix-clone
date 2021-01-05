import React,{useState,useEffect} from 'react';
import "./Nav.css";

const Nav= ()=> {
    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 50){
                handleShow(true);
            }else{
                handleShow(false);
            }
            
        });
        return () => {
            window.removeEventListener("scroll",()=>{})
        }
    }, [])
    
    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
            />
            <img
                alt="User logged"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                className="nav__avatar"
            />
        </nav>
    )
}

export default Nav
