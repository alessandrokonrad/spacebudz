import React from "react";
import Fade from "react-reveal/Fade";

const Coin = (props) => {
  React.useEffect(() => {
    console.log("LOADED");
  }, []);

  return <img src={`https://cryptocommand.io/assets/${props.id}.png`}></img>;
};

export default Coin;
