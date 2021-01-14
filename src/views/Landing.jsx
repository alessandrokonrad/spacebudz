import React from "react";
import { LaunchButton } from "../components/Button";
import { useHistory } from "react-router-dom";
import { Grid, Spacer, useMediaQuery } from "@geist-ui/react";

//assets
import Wallpaper from "../assets/wall3.jpg";
import BuySellIcon from "../assets/buysell.svg";
import CollectHoldIcon from "../assets/collecthold.svg";
import ShareGiftIcon from "../assets/sharegift.svg";
import BudRepresent from "../assets/spacebud.svg";

import "./Landing.scss";

const Landing = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${Wallpaper})`,
          // backgroundImage: `url(wall.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
              marginTop: matches ? "20%" : 140,
              marginLeft: matches && 70,
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Grid.Container style={{ width: "90%" }}>
                {/* <Grid md={14}></Grid> */}
                <Grid
                  xs={24}
                  md={10}
                  style={{
                    background: "white",
                    padding: 30,
                    borderRadius: 16,
                    // border: "solid #311b92 10px",
                    marginBottom: !matches && "30px",
                    position: "relative",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: matches ? 38 : 32,
                        fontWeight: 1000,
                        color: "#311b92",
                        // filter: "brightness(2)",
                      }}
                    >
                      Collect your favorite Astronauts!
                    </div>
                    <Spacer y={1} />
                    <div
                      style={{ color: "black", maxWidth: 350, fontSize: 14 }}
                    >
                      <Grid.Container gap={1}>
                        <Grid xs={12}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img src={BuySellIcon} width={30}></img>
                            <Spacer x={0.7} />
                            <div>Buy & Sell</div>
                          </div>
                        </Grid>
                        <Grid xs={12}>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img src={CollectHoldIcon} width={30}></img>

                            <Spacer x={0.7} />
                            <div>Collect & Hold</div>
                          </div>
                        </Grid>
                        <Grid xs={12}>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img src={ShareGiftIcon} width={30}></img>

                            <Spacer x={0.7} />
                            <div>Share & Gift</div>
                          </div>
                        </Grid>
                        <Grid xs={12}></Grid>
                      </Grid.Container>
                    </div>
                    <Spacer y={1} />
                    <div
                      style={{
                        maxWidth: 500,
                        fontSize: 18,
                        color: "#82817D",
                        fontWeight: "bold",
                      }}
                    >
                      1000 SpaceBudz are out there, what are you waiting for!
                    </div>
                  </div>
                  <Spacer y={1.8} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -25,
                    }}
                  >
                    <LaunchButton
                      onClick={() => {
                        history.push("/explore");
                        window.scrollTo(0, 0);
                      }}
                    />
                  </div>
                </Grid>
              </Grid.Container>
            </div>
          </div>
        </div>
      </div>
      <Spacer y={4} />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* What is SpaceBudz */}
        <div
          style={{
            maxWidth: 800,
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={BudRepresent} width="20%" style={{ minWidth: 100 }} />
          <Spacer x={2} />
          <div>
            <div style={{ fontSize: 32 }}>What is SpaceBudz?</div>
            <Spacer y={1} />
            <div style={{ fontWeight: "350", maxWidth: 370, lineHeight: 1.8 }}>
              SpaceBudz is a platform on the Cardano blockchain, where each
              SpaceBud is represented as a unique token. SpaceBudz is a platform
              on the Cardano blockchain, where each SpaceBud.
            </div>
          </div>
        </div>
        {/* How It Works */}
        <Spacer y={5} />
        <div style={{ fontSize: 32 }}>How It Works</div>
        {/* Contact */}
        <Spacer y={5} />
        <div style={{ fontSize: 32 }}>Still clueless?</div>
      </div>
      <Spacer y={3} />
    </div>
  );
};

export default Landing;
