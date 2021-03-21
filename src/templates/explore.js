import React from "react";
import Headroom from "react-headroom";
import { Search, setFilter } from "../components/Filter";
import InfiniteGrid from "../components/InfiniteGrid";
import { Grid, Loading, Spacer } from "@geist-ui/react";
import { Button, FloatingButton } from "../components/Button";
import { X } from "@geist-ui/react-icons";

import Layout from "./layout";
import Metadata from "../components/Metadata";
import FadeIn from "react-fade-in";

//assets
import Preview1 from "../images/assets/preview1.png";
import { navigate } from "gatsby-link";

// let fullList = [];

function hex2a(hexx) {
  var hex = hexx.split("\\x")[1].toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

const Explore = ({ pageContext: { spacebudz }, location }) => {
  const [disclaimer, setDisclaimer] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setDisclaimer(true), 1500);
  }, []);

  const fullList = spacebudz.map((bud) => ({ ...bud }));

  const [array, setArray] = React.useState(fullList);
  // const [array, setArray] = React.useState([]);
  const [filters, setFilters] = React.useState({
    price: null,
    search: null,
    forSale: false,
  });
  const [param, setParam] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const setColor = (order, up = true) => {
    if (order == null) return "#b5b5b5";
    if (order == "ASC" && up) return "black";
    if (order == "ASC" && !up) return "#b5b5b5";
    if (order == "DESC" && up) return "#b5b5b5";
    if (order == "DESC" && !up) return "black";
  };

  const applySearch = () => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search");

    if (search) {
      setLoading(true);
      setParam(search);
      setTimeout(() => {
        const f = filters;
        f.search = search;
        setFilter(fullList, setArray, f);
        setFilters(f);
        setLoading(false);
      });
    }
  };

  const fetchData = async () => {
    const result = await fetch("https://graphql-api.testnet.dandelion.link/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
      utxos(
        where: {
          tokens: {
            policyId: {
              _eq: "6bf5d009ce1a5b58cc661a887255495404c00c8992f544dac8961033"
            }
          }
        }
      ) {
      tokens {assetName, policyId}
      }
    }`,
      }),
    }).then((r) => r.json());
    console.log(result);

    const tokens = result.data.utxos
      .map((utxo) => utxo.tokens)
      .reduce((asset, acc) => asset.concat(acc), [])
      .filter(
        (token) =>
          token.policyId ==
          "6bf5d009ce1a5b58cc661a887255495404c00c8992f544dac8961033"
      )
      .map((token) => {
        const id = hex2a(token.assetName).split("SpaceBud")[1];
        return {
          ...spacebudz[id],
        };
      });

    console.log(tokens);
    // fullList = tokens;
    // setArray(tokens);
    applySearch();
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
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
                  <Grid xs={24} md={12}>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <b style={{ fontSize: 16, color: "#777777" }}>
                        Total SpaceBudz:
                      </b>{" "}
                      {fullList.length.toLocaleString()} / 10,000
                    </div>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <div
                      style={{
                        display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <b style={{ color: "#777777", fontSize: 16 }}>
                          Result:{" "}
                        </b>
                        {array ? array.length.toLocaleString() : 0}
                      </div>
                      {/* <div style={{ width: "100%", textAlign: "end" }}>
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
                        </div> */}
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
              {loading ? (
                <Loading size="large" type="success" />
              ) : (
                array && <InfiniteGrid array={array} />
              )}
            </div>
          </div>
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

export default Explore;
