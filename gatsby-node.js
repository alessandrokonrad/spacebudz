const fs = require("fs");
const metadata = require("./metadata.json");
// const fetch = require("node-fetch");

const getSpacebudz = () => {
  return Object.keys(metadata).map((id) => {
    const price =
      Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 1 : null;
    const type = metadata[id].type;
    const gadgets = metadata[id].traits;
    return {
      id,
      // price,
      type,
      gadgets,
    };
  });
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  const spacebudz = getSpacebudz();
  // shuffle(spacebudz);
  // Create a page that lists all spacebud.
  createPage({
    path: `/explore/`,
    component: require.resolve("./src/templates/explore.js"),
    context: { spacebudz },
  });
  // Create a page for each spacebud.
  spacebudz.forEach((spacebud) => {
    createPage({
      path: `/explore/spacebud/${spacebud.id}/`,
      component: require.resolve("./src/templates/spacebud.js"),
      context: { spacebud },
    });
  });
};
