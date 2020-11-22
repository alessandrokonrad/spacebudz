import React from "react";
import { LaunchButton } from "../components/Button";
import { useHistory } from "react-router-dom";

//assets
import Background from "../assets/landing.svg";
import { Grid, Spacer, useMediaQuery } from "@geist-ui/react";

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
        <div
          style={{
            marginTop: matches ? 250 : 30,
            display: "flex",
            width: "100%",
          }}
        >
          {matches && (
            <>
              <img
                width={1450}
                style={{
                  position: "absolute",
                  right: -20,
                  top: 0,
                }}
                src={Background}
              />
              <Spacer x={5} />
            </>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid.Container style={{ width: "90%" }}>
              <Grid xs={24} md={12}>
                <div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 1000,
                      color: "#311b92",
                    }}
                  >
                    Collect your favorite Astronauts!
                  </div>
                  <Spacer y={0.5} />
                  <div style={{ maxWidth: 400, fontSize: 16 }}>
                    SpaceBudz is a NFT platform built on the Cardano blockchain.
                    Collect, buy and sell your favorite Budz. Share them with
                    your friends!
                  </div>
                </div>
                <Spacer y={1.8} />
                <LaunchButton
                  onClick={() => {
                    history.push("/browse");
                    window.scrollTo(0, 0);
                  }}
                />
              </Grid>
            </Grid.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
