module.exports = {
  apps : [{
    name : "server",
    script : "./cms/server.js",
    watch : false,
    env_production : {
      NODE_ENV : "production",
      PORT : 3000,
      GOOGLE_APPLICATION_CREDENTIALS : "./cms/credentials.json",
      DRIVE_FOLDER_ID: "17skfr62D6b-PxUR__XBYf_Q-TfJUgefT",
      // ALLOWED_ORIGIN: "" (wait for domain)
    }
  }]
}
