import { Grid } from "@geist-ui/react";
import React from "react";
import Coin from "../components/Coin";
import Fade from "react-reveal/Fade";
import InfiniteGrid from "../components/InfiniteGrid";

const Browse = (props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 1200, marginTop: 40 }}>
        <InfiniteGrid />
      </div>
    </div>
  );
};

export default Browse;
