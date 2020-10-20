import React from "react";
import Background from "../../assets/startButton.svg";
import { useMediaQuery } from "@geist-ui/react";
import style from "./StartButton.module.css";

const StartButton = (props) => {
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div
      className={style.startButton}
      style={{
        width: 85,
        height: 45,
        borderRadius: 25,
        fontWeight: 500,
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        border: "none",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "45px",

        zoom: !matches && "0.85",
      }}
    >
      Start
    </div>
  );
};

export default StartButton;
