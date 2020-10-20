import React from "react";
import Headroom from "react-headroom";
import { Search } from "../components/Filter";
import InfiniteGrid from "../components/InfiniteGrid";
import { SpaceBud } from ".";
import { Checkbox, Spacer } from "@geist-ui/react";
import { FloatingButton } from "../components/Button";

const array = [...Array(300).keys()];

const Browse = (props) => {
  const [isGridFirst, setIsGridFirst] = React.useState(false);
  const [showGrid, setShowGrid] = React.useState(true);
  const [idArray, setIdArray] = React.useState(null);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  React.useEffect(() => {
    let isSpaceBudView = false;
    let url = window.location.href;
    if (url.includes("spacebud")) {
      setShowGrid(false);
      isSpaceBudView = false;
      window.scrollTo(0, 0);
    } else {
      setShowGrid(true);
      isSpaceBudView = true;
    }

    if (isGridFirst || isSpaceBudView) {
      window.scrollTo(0, 0);
      setIsGridFirst(true);
    }
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
      {showGrid && <FloatingButton onClick={() => window.scrollTo(0, 0)} />}
      {isGridFirst && (
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
          <div>
            <Spacer y={0.8} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <b style={{ fontSize: 16 }}>Total SpaceBudz:</b> 1000
              </div>
              <Spacer x={1} />
              <div>
                <Checkbox>
                  <b style={{ fontSize: 16 }}>On Sale</b>
                </Checkbox>
              </div>
            </div>
          </div>
          <Spacer y={3} />
          <div
            style={{
              position: !showGrid && "fixed",
              marginBottom: 100,
            }}
          >
            {idArray && <InfiniteGrid array={idArray} />}
          </div>
        </div>
      )}
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
