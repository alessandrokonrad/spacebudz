import React from "react";
import { GridLayout } from "@egjs/react-infinitegrid";
import "./InfiniteGrid.css";
import { Link } from "gatsby";
import { Loading } from "@geist-ui/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled, { keyframes } from "styled-components";

var converterEngine = function (input) {
  // fn BLOB => Binary => Base64 ?
  var uInt8Array = new Uint8Array(input),
    i = uInt8Array.length;
  var biStr = []; //new Array(i);
  while (i--) {
    biStr[i] = String.fromCharCode(uInt8Array[i]);
  }
  var base64 = window.btoa(biStr.join(""));
  console.log("2. base64 produced >>> " + base64); // print-check conversion result
  return base64;
};

var getImageBase64 = function (url, callback) {
  // 1. Loading file from url:
  var xhr = new XMLHttpRequest(url);
  xhr.open("GET", url, true); // url is the url of a PNG image.
  xhr.responseType = "arraybuffer";
  xhr.callback = callback;
  xhr.onload = function (e) {
    if (this.status == 200) {
      // 2. When loaded, do:
      console.log("1:Loaded response >>> " + this.response); // print-check xhr response
      var imgBase64 = converterEngine(this.response); // convert BLOB to base64
      this.callback(imgBase64); //execute callback function with data
    }
  };
  xhr.send();
};

const fade = keyframes`
  from { opacity: 0}
  to   { opacity: 1}
`;

const CustomLazyImage = styled(LazyLoadImage)`
  animation: ${fade} 0.4s;
`;

const Item = ({ bud }) => {
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    getImageBase64(`../spacebudz/bud${bud.id}.png`, (data) =>
      setImage("data:image/png;base64," + data)
    );
  }, []);

  return (
    <div className="itemGrid">
      <Link to={`/explore/spacebud/${bud.id}`}>
        <div className="thumbnail">
          <div
            style={{
              textAlign: "center",
              marginBottom: -55,
              background: "white",
              fontSize: 14,
              fontWeight: 600,
              zIndex: 1,
              opacity: !bud.price && 0,
              color: "black",
              padding: "4px 16px",
              border: "solid 2px #777777",
              borderRadius: 20,
            }}
          >
            <span style={{ color: "#777777" }}>Buy</span>{" "}
            <span>{bud.price && bud.price + " ₳"}</span>
          </div>
          {/* <img src={`../spacebudz/bud${bud.id}.png`} /> */}
          {!image ? (
            <div></div>
          ) : (
            <CustomLazyImage
              threshold={400}
              alt={`SpaceBud #${bud.id}`}
              effect="opacity"
              // src={`../spacebudz/bud${bud.id}.png`}
              src={image}
            />
          )}
        </div>
        <div className="info">{`SpaceBud #${bud.id}`}</div>
      </Link>
    </div>
  );
};

const ScreenWidth = (props) => {
  const matches = useBreakpoint();

  return <InfiniteGrid {...props} matches={!matches.md} />;
};

class InfiniteGrid extends React.Component {
  state = { list: [], lastLoad: false };
  start = 0;
  updateLastOnce = true;
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(
        <Item
          groupKey={groupKey}
          key={start + i}
          bud={this.props.array[start + i]}
        />
      );
    }
    this.start = start + num;
    return items;
  }
  onAppend = ({ groupKey, startLoading }) => {
    if (
      this.state.list.length + 50 >= this.props.array.length &&
      this.updateLastOnce
    ) {
      this.setState({ ...this.state, lastLoad: true });
      this.updateLastOnce = false;
    }
    if (this.state.list.length >= this.props.array.length) return;
    startLoading();

    const loadVolume =
      this.props.array.length - this.start <= 50
        ? this.props.array.length - this.start
        : 50;

    const list = this.state.list;
    const items = this.loadItems((parseFloat(groupKey) || 0) + 1, loadVolume);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
    if (!this.updateLastOnce) this.setState({ ...this.state, lastLoad: false });
  };
  render() {
    return this.props.array.length > 0 ? (
      <div>
        <GridLayout
          options={{
            useRecycle: false,
            isConstantSize: true,
          }}
          layoutOptions={{
            margin: !this.props.matches && -6,
            align: "center",
          }}
          onAppend={this.onAppend}
          onLayoutComplete={this.onLayoutComplete}
        >
          {this.state.list}
        </GridLayout>
        {(!(this.state.list.length >= this.props.array.length) ||
          this.state.lastLoad) && (
          <>
            <div style={{ height: 100 }} />
            <Loading size="large" type="success" />
          </>
        )}
      </div>
    ) : (
      <div style={{ width: "100%", textAlign: "center" }}>
        SpaceBud not found
      </div>
    );
  }
}

export default ScreenWidth;
