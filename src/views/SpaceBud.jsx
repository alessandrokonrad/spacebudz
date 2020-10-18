import React from "react";
import { Planet } from "react-planet";

const SpaceBud = (props) => {
  const [id, setId] = React.useState("");
  React.useEffect(() => {
    let url = window.location.href;
    let id = url.split("spacebud/")[1];
    setId(id);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      Chosen Id: {id}
    </div>
  );
};

export default SpaceBud;
