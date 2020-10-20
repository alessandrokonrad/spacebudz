import { Link, Spacer } from "@geist-ui/react";
import { mdiShareVariantOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import MiddleEllipsis from "react-middle-ellipsis";
import { useHistory } from "react-router-dom";

const SpaceBud = (props) => {
  const history = useHistory();
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
      image: `/set3/sample${id}.svg`,
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
        <img width={300} height={300} src={data.image} />
        <Spacer y={1} />
        <div style={{ fontWeight: 600, fontSize: 30 }}>SpaceBud #{data.id}</div>
        Ape Astronaut
      </div>
      <Spacer y={0.6} />
      <div
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          border: "solid 2px #311b92",
          borderRadius: 25,
          color: "#777777",
        }}
      >
        <span>
          <b>Owner:</b>{" "}
        </span>
        <div
          style={{
            width: "200px",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          <MiddleEllipsis>
            <Link
              underline
              color="success"
              onClick={(e) => {
                e.preventDefault();
                history.push("/");
              }}
            >
              addr1q88auysv8uale3unvnk2s9xrwqqxf2dzs7wpyut6g3xzuwlnhh356yzp7k3qwmhe4fk0g5u6kx5ka4rz5qcq4j7mvh2swy44jn
            </Link>
          </MiddleEllipsis>
        </div>
      </div>
    </div>
  );
};

export default SpaceBud;
