module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-typescript',
  ],
  plugins: [
    './plugins/operator_overload.cjs',
  ],
};
