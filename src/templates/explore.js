import React from "react";
import Headroom from "react-headroom";
import { Search, setFilter } from "../components/Filter";
import InfiniteGrid from "../components/InfiniteGrid";
import { Checkbox, Grid, Spacer } from "@geist-ui/react";
import { FloatingButton } from "../components/Button";
import { ChevronDown, ChevronUp } from "@geist-ui/react-icons";

import Layout from "./layout";
import Metadata from "../components/Metadata";

const Explore = ({ pageContext: { spacebudz }, location }) => {
  // const data = useStaticQuery(
  //   graphql`
  //     query {
  //       allFile(
  //         filter: {
  //           extension: { regex: "/(jpeg|jpg|gif|png|svg)/" }
  //           relativeDirectory: { eq: "spacebudz" }
  //         }
  //       ) {
  //         edges {
  //           node {
  //             childImageSharp {
  //               fluid(maxWidth: 1000, quality: 100) {
  //                 ...GatsbyImageSharpFluid
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // );

  // const image = (id) =>
  //   data.allFile.edges.find((a) =>
  //     a.node.childImageSharp.fluid.src.includes(`sample${id}.png`)
  //   ).node.childImageSharp.fluid;

  const fullList = spacebudz.map((bud) => ({ ...bud }));

  const [array, setArray] = React.useState(fullList);
  const [filters, setFilters] = React.useState({
    price: null,
    search: null,
    forSale: false,
  });
  const [param, setParam] = React.useState("");

  const setColor = (order, up = true) => {
    if (order == null) return "#b5b5b5";
    if (order == "ASC" && up) return "black";
    if (order == "ASC" && !up) return "#b5b5b5";
    if (order == "DESC" && up) return "#b5b5b5";
    if (order == "DESC" && !up) return "black";
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search");
    if (search) {
      setParam(search);
      setTimeout(() => {
        const f = filters;
        f.search = search;
        setFilter(fullList, setArray, f);
        setFilters(f);
      });
    }
  }, []);

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz | Explore"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <Layout>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 110,
          }}
        >
          <FloatingButton onClick={() => window.scrollTo(0, 0)} />

          <div
            style={{
              width: "100%",
              maxWidth: 1400,
            }}
          >
            <Headroom style={{ zIndex: 2 }}>
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
                    marginBottom: 20,
                    marginTop: 20,
                    width: "85%",
                    maxWidth: 370,
                  }}
                >
                  <Search
                    param={param}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        window.scrollTo(0, 0);
                        if (e.target.value) e.persist();
                        if (e.target.value == "") return;

                        setTimeout(() => {
                          const f = filters;
                          f.search = e.target.value;
                          setFilter(fullList, setArray, f);
                          setFilters(f);
                          window.history.pushState(
                            {},
                            null,
                            `/explore/?search=${e.target.value}`
                          );
                        });
                      }
                    }}
                    onSearch={(e) => {
                      window.scrollTo(0, 0);
                      if (e == "") return;

                      setTimeout(() => {
                        const f = filters;
                        f.search = e;
                        setFilter(fullList, setArray, f);
                        setFilters(f);
                        window.history.pushState(
                          {},
                          null,
                          `/explore/?search=${e}`
                        );
                      });
                    }}
                    onChange={(e) => {
                      if (e.target.value) e.persist();
                      if (
                        e.target.value == "" &&
                        array.toString() != fullList
                      ) {
                        const f = filters;
                        f.search = null;
                        setFilter(fullList, setArray, f);
                        setFilters(f);
                        window.history.pushState({}, null, `/explore/`);
                        return;
                      }
                    }}
                  />
                </div>
              </div>
            </Headroom>
            <div>
              <Spacer y={0.8} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Grid.Container
                  gap={1}
                  style={{ width: "100%", maxWidth: 550 }}
                >
                  <Grid xs={24} md={8}>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <b style={{ fontSize: 16 }}>Total SpaceBudz:</b>{" "}
                      {array && array.length}
                    </div>
                  </Grid>
                  <Grid xs={24} md={16}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ width: "100%", textAlign: "end" }}>
                        <Checkbox
                          onChange={(e) => {
                            const f = filters;
                            f.forSale = e.target.checked;
                            setFilter(fullList, setArray, f);
                            setFilters(f);
                          }}
                        >
                          <b style={{ fontSize: 16 }}>For Sale</b>
                        </Checkbox>
                      </div>
                      <div style={{ width: 20 }} />
                      <div
                        style={{
                          width: "100%",
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                        }}
                      >
                        <div
                          onClick={() => {
                            const f = filters;
                            f.price = filters.price
                              ? filters.price == "ASC"
                                ? "DESC"
                                : null
                              : "ASC";
                            setFilter(fullList, setArray, f);
                            setFilters(f);
                          }}
                          style={{
                            display: "flex",
                            cursor: "pointer",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <ChevronUp
                              size={18}
                              color={setColor(filters.price)}
                            />
                            <div style={{ marginBottom: -10 }} />
                            <ChevronDown
                              size={18}
                              color={setColor(filters.price, false)}
                            />
                          </div>
                          <div style={{ width: 3 }} />
                          <b style={{ fontSize: 16 }}>Price</b>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>
            </div>
            <Spacer y={3} />
            <div
              style={{
                marginBottom: 100,
              }}
            >
              {array && <InfiniteGrid array={array} />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Explore;
