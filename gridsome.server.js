// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api

    const data = require('./data/settings.json');

    const Menu = store.addCollection({typeName: 'Menu'});

    for (const item of data.sidebar) {
      Menu.addNode({
        section: item.section,
        topics: item.topics
      })
    }
  });

  api.loadSource(store => {

    const Lang = store.addCollection({typeName: 'Lang'});
    const fs = require('fs');
    const files = fs.readdirSync('./languages');
    for (const file of files) {
      const name = file.split('.')[0];
      Lang.addNode({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        path: "/" + name
      });
    }
  });

  api.createPages(({createPage}) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
};
