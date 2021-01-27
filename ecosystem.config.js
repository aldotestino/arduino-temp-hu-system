module.exports = {
  apps : [
    {
      name: "arduino-temp-hu-server",
      script: "./server/build/index.js",
      watch: true
    },
    {
      name: "arduino-temp-hu-client",
      cwd: "./client/build",
      script: "npx",
      interpreter: "none",
      args: "serve -p 3000",
      watch: true
    }
  ]
};