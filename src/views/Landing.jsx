import React from "react";
import { LaunchButton } from "../components/Button";
import { useHistory } from "react-router-dom";

//assets
import Background from "../assets/landing.svg";
import { Spacer, useMediaQuery } from "@geist-ui/react";

const Landing = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
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
          {matches && (
            <>
              <img width={800} src={Background} />
              <Spacer x={5} />
            </>
          )}
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, textAlign: "center" }}>
              SpaceBudz - An interactive NFT game
            </div>
            <div style={{ maxWidth: 300 }}>
              SpaceBudz - An interactive NFT game t is a long established fact
              that a reader will be distracted by the readable content of a page
            </div>
            <Spacer y={2.5} />
            <LaunchButton
              onClick={() => {
                history.push("/browse");
                window.scrollTo(0, 0);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
