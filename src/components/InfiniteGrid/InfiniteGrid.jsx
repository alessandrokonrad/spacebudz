import React from "react";
import { GridLayout } from "@egjs/react-infinitegrid";
import "./InfiniteGrid.css";

const Item = ({ num }) => (
  <div className="itemGrid">
    <div className="thumbnail">
      <img src={`https://picsum.photos/1000/1000?random=${num}`} alt="egjs" />
    </div>
    <div className="info">{`SpaceBud #${num}`}</div>
  </div>
);

class InfiniteGrid extends React.Component {
  state = { list: [] };
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(
        <Item groupKey={groupKey} num={1 + start + i} key={start + i}></Item>
      );
    }
    this.start = start + num;
    return items;
  }
  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    const list = this.state.list;
    const items = this.loadItems((parseFloat(groupKey) || 0) + 1, 10);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };
  render() {
    console.log(this.state.list);
    return (
      <GridLayout
        options={{
          isConstantSize: true,
          transitionDuration: 0.2,
        }}
        layoutOptions={{
          margin: 40,
          align: "center",
        }}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
      >
        {this.state.list}
      </GridLayout>
    );
  }
}

export default InfiniteGrid;
