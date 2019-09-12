const path = require('path');

const storesPath = path.join(__dirname, '/src/stores');

const config = {
  '~stores': storesPath,
};

module.exports = {
  config,
};
