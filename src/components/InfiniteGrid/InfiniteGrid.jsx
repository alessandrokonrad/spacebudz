import React from "react";
import { GridLayout } from "@egjs/react-infinitegrid";
import "./InfiniteGrid.css";
import { Link } from "gatsby";
import { Loading } from "@geist-ui/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

const Item = ({ bud }) => (
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
        <img src={`../spacebudz/bud${bud.id}.png`} />
      </div>
      <div className="info">{`SpaceBud #${bud.id}`}</div>
    </Link>
  </div>
);

const ScreenWidth = (props) => {
  const matches = useBreakpoint();

  return <InfiniteGrid {...props} matches={!matches.md} />;
};

class InfiniteGrid extends React.Component {
  state = { list: [] };
  start = 0;
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
        {!(this.state.list.length >= this.props.array.length) && (
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
