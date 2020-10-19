import { Button, Spacer } from "@geist-ui/react";
import { mdiShare, mdiShareVariant, mdiShareVariantOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Sample from "../assets/coin.png";

const SpaceBud = (props) => {
  const [data, setData] = React.useState("");

  const getId = () => {
    const url = window.location.href;
    const id = url.split("spacebud/")[1];
    return id;
  };

  const fetchData = () => {
    const id = getId();
    const data = {
      id,
      attributes: { helmet: true, weapon: true },
      type: "Ape",
      image: `https://picsum.photos/1000/1000?random=${id}`,
    };
    setData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20,
      }}
    >
      <div
        style={{
          position: "relative",
          paddingTop: 35,
          paddingBottom: 35,
          width: "95%",
          borderRadius: 10,
          backgroundColor: "#263238",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Icon
          path={mdiShareVariantOutline}
          size={1.2}
          style={{ position: "absolute", left: 25, top: 25, cursor: "pointer" }}
        ></Icon>
        <img width={300} style={{ borderRadius: "50%" }} src={Sample} />
        <Spacer y={1} />
        <div style={{ fontWeight: 600, fontSize: 30 }}>SpaceBud #{data.id}</div>
        Ape Astronaut
      </div>
    </div>
  );
};

export default SpaceBud;
