import {config} from "dotenv";

config();

const {
    API_URL,
    API_KEY,
    IP_V4,
    IP_V6
} = process.env;

const PORT = parseInt(process.env.PORT);
const RTC_MIN_PORT = parseInt(process.env.RTC_MIN_PORT);
const RTC_MAX_PORT = parseInt(process.env.RTC_MAX_PORT);
const OV_MIN_PORT = parseInt(process.env.OV_MIN_PORT);
const OV_MAX_PORT = parseInt(process.env.OV_MAX_PORT);

export {
    API_URL,
    RTC_MIN_PORT,
    RTC_MAX_PORT,
    OV_MIN_PORT,
    OV_MAX_PORT,
    API_KEY,
    IP_V4,
    IP_V6,
    PORT
}
