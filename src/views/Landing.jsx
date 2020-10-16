import React from "react";
import { Button, LaunchButton } from "../components/Button";
import { mdiRocketOutline } from "@mdi/js";
import Icon from "@mdi/react";

//assets
import Background from "../assets/landing.svg";
import { Spacer } from "@geist-ui/react";

const Landing = (props) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: 100, display: "flex" }}>
          <>
            <img width={800} src={Background} />
            <Spacer x={5} />
          </>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, textAlign: "center" }}>
              SpaceBudz - An interactive NFT game
            </div>
            <div style={{ maxWidth: 300 }}>
              SpaceBudz - An interactive NFT game t is a long established fact
              that a reader will be distracted by the readable content of a page
            </div>
            <Spacer y={2.5} />
            <LaunchButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
