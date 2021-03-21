export const setFilter = (array, setArray, filters) => {
  let filtered = array;
  filters.price != null && (filtered = sortArray(filtered, filters.price));
  filters.forSale &&
    (filtered = filterBudz(
      filtered,
      (bud) => Boolean(bud.price) && bud.price > 0
    ));

  if (filters.search || filters.search == 0) {
    if (!isNaN(filters.search)) {
      let result = filtered.find((bud) => bud.id == filters.search);
      filtered = result ? [result] : [];
    } else {
      filters.search.split("&").forEach((search) => {
        let result = filtered.filter(
          (bud) =>
            bud.type.toLowerCase().includes(search.toLowerCase()) ||
            bud.gadgets.some((gadget) =>
              gadget.toLowerCase().includes(search.toLowerCase())
            )
        );
        filtered = result;
      });
    }
  }
  setArray(null);
  setTimeout(() => setArray(filtered));
};

const filterBudz = (array, filterOption) => {
  const copy = array.filter((bud) => filterOption(bud));
  return copy;
};

const sortArray = (array, price) => {
  const copy = [...array];
  copy.sort((a, b) => {
    // equal items sort equally
    if (a.price === b.price) {
      return 0;
    }
    // nulls sort after anything else
    else if (a.price === null) {
      return 1;
    } else if (b.price === null) {
      return -1;
    }
    // otherwise, if we're ascending, lowest sorts first
    else if (price == "ASC") {
      return a.price < b.price ? -1 : 1;
    }
    // if descending, highest sorts first
    else if (price == "DESC") {
      return a.price < b.price ? 1 : -1;
    }
    // if (!a.price || !b.price) return 1;
    // return a.price > b.price ? 1 : -1;
  });
  return copy;
};
