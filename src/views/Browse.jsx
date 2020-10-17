import React from "react";
import Headroom from "react-headroom";
import { Search } from "../components/Filter";
import InfiniteGrid from "../components/InfiniteGrid";

const array = [...Array(300).keys()];

const Browse = (props) => {
  const [idArray, setIdArray] = React.useState(null);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  React.useEffect(() => {
    shuffle(array);
    setIdArray(array);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 100,
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
          width: "100%",
          maxWidth: 1400,
          marginTop: 80,
        }}
      >
        {idArray && <InfiniteGrid array={idArray} />}
      </div>
    </div>
  );
};

export default Browse;
