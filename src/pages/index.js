import React from "react";
import { Button, LaunchButton } from "../components/Button";
import { Grid, Spacer } from "@geist-ui/react";

import Layout from "../templates/layout";
import Metadata from "../components/Metadata";

//assets
import Preview1 from "../images/assets/preview1.png";
import BuySellIcon from "../images/assets/buysell.svg";
import CollectHoldIcon from "../images/assets/collecthold.svg";
import ShareGiftIcon from "../images/assets/sharegift.svg";
import BudRepresent from "../images/assets/spacebud.svg";
import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";
import { X } from "@geist-ui/react-icons";
import FadeIn from "react-fade-in";

const Landing = (props) => {
  const matches = useBreakpoint();
  const [disclaimer, setDisclaimer] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setDisclaimer(true), 1500);
  }, []);

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <Layout>
        <div>
          <Background>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  marginTop: !matches.md ? "20%" : 140,
                  marginLeft: !matches.md && 70,
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
                    <Grid md={13}></Grid>
                    <Grid
                      xs={24}
                      md={10}
                      style={{
                        background: "white",
                        padding: 30,
                        borderRadius: 16,
                        // border: "solid #311b92 10px",
                        marginBottom: !matches.md && "30px",
                        position: "relative",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: !matches.md ? 38 : 32,
                            fontWeight: 1000,
                            color: "#311b92",
                            // filter: "brightness(2)",
                          }}
                        >
                          Collect your favorite Astronauts!
                        </div>
                        <Spacer y={1} />
                        <div
                          style={{
                            color: "black",
                            maxWidth: 350,
                            fontSize: 14,
                          }}
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
                          10,000 SpaceBudz are out there, what are you waiting
                          for!
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
                            navigate("/explore");
                            // window.scrollTo(0, 0);
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid.Container>
                </div>
              </div>
            </div>
          </Background>
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
                <div
                  style={{ fontWeight: "350", maxWidth: 370, lineHeight: 1.8 }}
                >
                  SpaceBudz is a platform on the Cardano blockchain, where each
                  SpaceBud is represented as a unique token. SpaceBudz is a
                  platform on the Cardano blockchain, where each SpaceBud.
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
        {disclaimer && (
          <div
            style={{
              position: "fixed",
              bottom: -60,
              width: "90%",
              maxWidth: 450,
              height: 200,
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              // border: "solid #777777 2px",
            }}
          >
            <FadeIn>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  borderRadius: 16,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setDisclaimer(false)}
                >
                  <X size={20} />
                </div>
                <img src={Preview1} width={200} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontWeight: 500 }}>Get your SpaceBud now!</div>
                  <div style={{ height: 20 }} />
                  <Button onClick={() => navigate("/opening")}>Get It</Button>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </Layout>
    </>
  );
};

const BackgroundSection = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "assets/wallpaper.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 10000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );
  // Set ImageData.
  const imageData = data.desktop.childImageSharp.fluid;

  return (
    <BackgroundImage
      className={props.className}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      {props.children}
    </BackgroundImage>
  );
};

const Background = styled(BackgroundSection)`
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Landing;
