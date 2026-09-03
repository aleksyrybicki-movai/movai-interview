const { merge } = require('webpack-merge');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

const getWebSocketUrlWebpackConfig = () => {
  const isGHWorkspacesEnvironment = Object.keys(process.env).some(key => key.includes('CODESPACES'));
  
  if (isGHWorkspacesEnvironment) {
    const url = new URL(`https://${process.env.CODESPACE_NAME}-4200.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`);
    const webSocketURL = `wss://${url.hostname}/ws`;
    return {
      devServer: {
        client: {
          webSocketURL,
        },
      },
    };
  }

  return {};
};

module.exports = (config, context) => {
  return merge(nrwlConfig(config), {
    node: {
      global: true,
    },
    ...getWebSocketUrlWebpackConfig(),
  });
};
