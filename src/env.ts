import {config} from "dotenv";

config();

const {
    API_URL,
    API_KEY,
    IP_V4,
    IP_V6,
    LISTEN_IP,
    ANNOUNCED_IP
} = process.env;

const PORT = parseInt(process.env.PORT, 10);
const RTC_MIN_PORT = parseInt(process.env.RTC_MIN_PORT, 10);
const RTC_MAX_PORT = parseInt(process.env.RTC_MAX_PORT, 10);
const OV_MIN_PORT = parseInt(process.env.OV_MIN_PORT, 10);
const OV_MAX_PORT = parseInt(process.env.OV_MAX_PORT, 10);
const CONNECTIONS_PER_CPU = parseInt(process.env.CONNECTIONS_PER_CPU, 10);


const MEDIASOUP_CONFIG = require('./config').default;

export {
    API_URL,
    RTC_MIN_PORT,
    RTC_MAX_PORT,
    OV_MIN_PORT,
    OV_MAX_PORT,
    API_KEY,
    IP_V4,
    IP_V6,
    PORT,
    CONNECTIONS_PER_CPU,
    MEDIASOUP_CONFIG,
    LISTEN_IP,
    ANNOUNCED_IP
}
