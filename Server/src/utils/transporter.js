const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "vehibuy97@gmail.com",
    pass: "Vehibuy98+",
    clientId:
      "385426413118-qtcv0kd8so271r879rhbopiunf8mjpm7.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//047171sTOtbhbCgYIARAAGAQSNwF-L9Irb81srx28yuNHt8y9CutU-zeIb-8jZwGlbYIneTy4AUeHoNb_atLxJaPYFzqCgAC1OCE",
  },
});
module.exports = transporter;
