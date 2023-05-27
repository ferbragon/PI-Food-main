import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../stylesheets/LandingPage.css";
import imageBackground from "../assets/foodImageLanding.png";
import React, { useState, useEffect }from "react";
import SwitchButton from "./SwitchButton";
import { login } from "../redux/actions";
import Loading from "./Loading";

const LandingPage = ({ handleRecipes })=> {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Local state
    const [loading, setLoading] = useState(false);
    //Global State
    const enter = useSelector((state) => state.login);

    useEffect(() => {
        if (!enter) {
            navigate('/');
        }
    }, [enter, navigate]);

     const handleEnterButton = () => {
        if(!enter){
            setLoading(true);
            dispatch(login(!enter));
            handleRecipes();
            setTimeout(() => {
                navigate("/home");
                setLoading(false);
            }, 2500);
        }else{
            navigate("/");
        };
    }

    return(
        <div className="landingPage">
            <h1 className="welcome" >Let's do recipes!</h1>
            <SwitchButton className="enterButton" handleEnterButton={handleEnterButton} />
            {loading && <Loading />}
            <div className="hola">
            <img src={imageBackground} className={!enter ? "imageBackground" : "imageBackgroundAfter"} alt="food background"/>
            </div>
        </div>
    )
};

export default LandingPage;