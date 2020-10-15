import React from "react";
import { Button as ZButton } from "@geist-ui/react";
import style from "./button.module.css";

const Button = (props) => {
  return (
    <ZButton {...props} effect={false} className={style.button}>
      {props.children}
    </ZButton>
  );
};

export default Button;
