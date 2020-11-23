import React from "react";
import { LaunchButton } from "../components/Button";
import { useHistory } from "react-router-dom";
import { Grid, Spacer, useMediaQuery } from "@geist-ui/react";

//assets
import Wallpaper from "../assets/wallpaper.svg";
import BuySellIcon from "../assets/buysell.svg";
import CollectHoldIcon from "../assets/collecthold.svg";
import ShareGiftIcon from "../assets/sharegift.svg";
import BudRepresent from "../assets/spacebud.svg";

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
                <Grid xs={24} md={12}>
                  <div>
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 1000,
                        color: "#311b92",
                      }}
                    >
                      Collect your favorite Astronauts!
                    </div>
                    <Spacer y={1} />
                    <div
                      style={{ color: "white", maxWidth: 350, fontSize: 14 }}
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
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      1000 SpaceBudz are out there, what are you waiting for!
                    </div>
                  </div>
                  <Spacer y={1.8} />
                  <LaunchButton
                    onClick={() => {
                      history.push("/explore");
                      window.scrollTo(0, 0);
                    }}
                  />
                </Grid>
              </Grid.Container>
            </div>
          </div>
        </div>
      </div>
      {/* What is SpaceBudz */}
      <Spacer y={4} />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </div>
      <Spacer y={3} />
    </div>
  );
};

export default Landing;
