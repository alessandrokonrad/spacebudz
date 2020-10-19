import React from "react";
import { mdiMagnify, mdiSearchWeb } from "@mdi/js";
import Icon from "@mdi/react";
import Input from "../Input";

const Search = (props) => {
  const [searchId, setSearchId] = React.useState("");
  return (
    <Input
      placeholder="Search"
      value={searchId}
      onChange={(e) => {
        setSearchId(e.target.value);
        props.onChange(e);
      }}
    />
  );
};

export default Search;
