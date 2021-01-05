import Router from "./model/Router";
import {IP_V4, IP_V6, OV_MAX_PORT, PORT, RTC_MAX_PORT, RTC_MIN_PORT} from "./env";
import * as publicIp from "public-ip";

const getInitialRouter = async (): Promise<Omit<Router, "_id">> => {
    const ipv4: string = IP_V4 || await publicIp.v4()
    const ipv6: string = IP_V6 || await publicIp.v6()
    const router: Omit<Router, "_id"> = {
        wsPrefix: "ws",
        restPrefix: "",
        url: "localhost",
        path: "",
        ipv4: ipv4,
        ipv6: ipv6,
        port: PORT,
        availableRTCSlots: (RTC_MAX_PORT - RTC_MIN_PORT),
        availableOVSlots: (OV_MAX_PORT - RTC_MIN_PORT),
    };
    return router;
}

export {
    getInitialRouter
}
