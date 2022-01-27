const axios = require("axios");

export default axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
