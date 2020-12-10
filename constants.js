import dotenv from "dotenv";
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

export { DB_PASSWORD, DB_USERNAME, TICKETMASTER_API_KEY, JWT_SECRET };
