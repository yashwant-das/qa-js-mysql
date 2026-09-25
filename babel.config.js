// Jest runs CommonJS; Faker 10 ships only as ES modules, so Babel converts it for the tests.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
