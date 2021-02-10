import React from "react";
import { mdiMagnify, mdiSearchWeb } from "@mdi/js";
import Icon from "@mdi/react";
import Input from "../Input";

const Search = (props) => {
  const [searchId, setSearchId] = React.useState(props.param);
  React.useEffect(() => {
    if (props.param) setSearchId(props.param);
  }, [props.param]);
  return (
    <Input
      placeholder="Search #, Animal, Gadget"
      value={searchId}
      onKeyUp={(e) => props.onKeyUp(e)}
      onSearch={() => props.onSearch(searchId)}
      onChange={(e) => {
        setSearchId(e.target.value);
        props.onChange && props.onChange(e);
      }}
    />
  );
};

export default Search;
