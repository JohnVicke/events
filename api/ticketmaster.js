import config from "./config";
import axios from "axios";

const getURL = (path, params = undefined) => {
  let queryString = "";
  if (params) {
    queryString =
      Object.keys(params)
        .map((key) => {
          return `${key}=${params[key].replace(" ", "")}`;
        })
        .join("&") + "&";
  }

  return `${config.baseURL}/${path}.json?${queryString}apikey=${config.apiKey}`;
};

const getEvents = async () => {
  try {
    const url = getURL("events", { countryCode: "SE" });
    console.log(url);
    const res = await axios.get(url);
    console.log(res.data);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

getEvents();
