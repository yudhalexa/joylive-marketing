module.exports = {
  apps : [{
    name : "server",
    script : "./server.js",
    watch : false,
    env_production : {
      NODE_ENV : "production",
      PORT : 3000,
      DRIVE_FOLDER_ID: "17skfr62D6b-PxUR__XBYf_Q-TfJUgefT",
      // TODO: uncomment below after getting the domain
      // ALLOWED_ORIGIN: ""
    }
  }]
}
