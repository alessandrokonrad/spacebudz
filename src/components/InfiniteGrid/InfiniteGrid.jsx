import React from "react";
import { GridLayout } from "@egjs/react-infinitegrid";
import "./InfiniteGrid.css";
import { Loading, useMediaQuery } from "@geist-ui/react";
import { Link } from "react-router-dom";

const Item = ({ num, array }) => (
  <div className="itemGrid">
    <Link to={`/explore/spacebud/${array[num]}`}>
      <div className="thumbnail">
        <img
          // src={`https://picsum.photos/1000/1000?random=${array[num]}`}
          src={`/set3/sample${array[num]}.svg`}
          alt="egjs"
        />
      </div>
      <div className="info">{`SpaceBud #${array[num]}`}</div>
    </Link>
  </div>
);

const ScreenWidth = (props) => {
  const matches = useMediaQuery("md", { match: "up" });
  return <InfiniteGrid {...props} matches={matches} />;
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
          num={start + i}
          key={start + i}
          array={this.props.array}
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
      this.props.array.length - this.start <= 10
        ? this.props.array.length - this.start
        : 10;

    const list = this.state.list;
    const items = this.loadItems((parseFloat(groupKey) || 0) + 1, loadVolume);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };
  render() {
    return this.props.array.length > 0 ? (
      <GridLayout
        options={{
          useRecycle: false,
          isConstantSize: true,
        }}
        layoutOptions={{
          margin: !this.props.matches && -6,
          align: "center",
        }}
        loading={<Loading size="large" type="success" />}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
      >
        {this.state.list}
      </GridLayout>
    ) : (
      <div style={{ width: "100%", textAlign: "center" }}>
        SpaceBud not found
      </div>
    );
  }
}

export default ScreenWidth;
