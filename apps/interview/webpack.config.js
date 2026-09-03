const { merge } = require('webpack-merge');
const { execSync } = require("child_process");
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

const getWebSocketUrlWebpackConfig = () => {
  const isGitPodEnvironment = Object.keys(process.env).some(key => key.includes('GITPOD'));
  
  if (isGitPodEnvironment) {
    const url = new URL(execSync('gp url 4200'));
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
