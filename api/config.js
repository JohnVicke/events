import { TICKETMASTER_API_KEY } from "../constants";
console.log(TICKETMASTER_API_KEY);

const config = {
  baseURL: "https://app.ticketmaster.com/discovery/v2",
  apiKey: TICKETMASTER_API_KEY,
};

export default config;
