module.exports = {
  apps : [{
    name   : "versal-labs",
    // Point directly to the Next.js binary script
    script : "./node_modules/next/dist/bin/next",
    args   : "start",
    env: {
      PORT: 3000,
      NODE_ENV: "production"
    }
  }]
}