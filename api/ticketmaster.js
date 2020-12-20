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

const parseEvent = ({ data }) => {
  return data._embedded.events.map((event) => {
    const {
      name,
      type,
      dates: {
        start: { dateTime },
      },
    } = event;

    const locationInfo = event._embedded.venues[0];

    return {
      name: name,
      date: dateTime ? dateTime : "To be announced",
      image: event.images.find((image) => image.ratio === "16_9").url,
      type: type,
      location: {
        name: locationInfo.country.name,
        countryCode: locationInfo.country.countryCode,
        city: locationInfo.city.name,
        venue: locationInfo.name,
      },
    };
  });
};

export const getEvents = async (params) => {
  try {
    const url = getURL("events", { ...params });
    const res = await axios.get(url);
    return parseEvent(res);
  } catch (e) {
    console.log(e);
    return e;
  }
};
