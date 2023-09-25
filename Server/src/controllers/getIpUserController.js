const axios = require("axios");

const getIpUserController = async (clientIp) =>
  await axios.get(`https://ipinfo.io/${clientIp}/json`);

module.exports = { getIpUserController };
