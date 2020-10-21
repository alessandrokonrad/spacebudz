import React from "react";
import { useMediaQuery } from "@geist-ui/react";
import style from "./Button.module.css";

const Button = (props) => {
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div
      {...props}
      className={style.startButton}
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 85,
        height: 45,
        borderRadius: 25,
        fontWeight: 500,
        background: props.bgcolor || "#4a148c",
        border: "none",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "45px",

        zoom: !matches && "0.85",
      }}
    >
      {props.children}
    </div>
  );
};

export default Button;
