import React from "react";
import Headroom from "react-headroom";
import { Search } from "../components/Filter";
import InfiniteGrid from "../components/InfiniteGrid";
import { SpaceBud } from ".";

const array = [...Array(300).keys()];

const Browse = (props) => {
  const [showGrid, setShowGrid] = React.useState(true);
  const [idArray, setIdArray] = React.useState(null);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  React.useEffect(() => {
    let url = window.location.href;
    if (url.includes("spacebud")) {
      setShowGrid(false);
      window.scrollTo(0, 0);
    } else setShowGrid(true);
  }, [window.location.href]);

  React.useEffect(() => {
    shuffle(array);
    setIdArray(array);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
      }}
    >
      <div
        style={{
          opacity: !showGrid && 0,
          width: "100%",
          maxWidth: 1400,
        }}
      >
        <Headroom>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <Search
                onChange={(e) => {
                  window.scrollTo(0, 0);
                  if (e.target.value) e.persist();
                  if (e.target.value == "") {
                    setIdArray(null);
                    setTimeout(() => setIdArray(array));
                    return;
                  }
                  setIdArray(null);
                  setTimeout(() => setIdArray([e.target.value]));
                }}
              />
            </div>
          </div>
        </Headroom>

        <div
          style={{
            position: !showGrid && "fixed",
            marginTop: 80,
            marginBottom: 100,
          }}
        >
          {idArray && <InfiniteGrid array={idArray} />}
        </div>
      </div>
      {!showGrid && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <SpaceBud />
        </div>
      )}
    </div>
  );
};

export default Browse;
