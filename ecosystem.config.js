module.exports = {
  apps : [
    {
      name: "arduino-temp-hu-server",
      script: "./server/build/index.js",
      watch: true
    },
    {
      name: "arduino-temp-hu-client",
      cwd: "./client",
      script: "npm",
      args: "start",
      watch: true
    }
  ]
};