import React from "react";
import Icon from "@mdi/react";
import style from "./Tab.module.css";
import { Spacer, Popover, useMediaQuery } from "@geist-ui/react";
import { mdiMenuDown } from "@mdi/js";

const Tab = (props) => {
  const matches = useMediaQuery("md", { match: "up" });
  return (
    <Popover {...props} content={props.menu} trigger="hover">
      <div className={style.tab}>
        <Icon path={props.icon} size={0.9} />
        {matches && (
          <>
            <Spacer x={0.2} />
            <div>{props.children}</div>
            {props.menu && (
              <>
                <Spacer x={0.1} />
                <Icon path={mdiMenuDown} size={0.9} />{" "}
              </>
            )}
          </>
        )}
      </div>
    </Popover>
  );
};

export default Tab;
