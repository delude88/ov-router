import Router from "./model/Router";
import {
    ANNOUNCED_IP,
    IP_V4,
    IP_V6,
    LISTEN_IP,
    MEDIASOUP_CONFIG,
    OV_MAX_PORT,
    PORT,
    RTC_MAX_PORT,
    RTC_MIN_PORT
} from "./env";
import * as publicIp from "public-ip";
import {MediasoupConfiguration} from "./services/MediasoupService";

const getDefaultMediasoupConfig = (ipv4: string): MediasoupConfiguration => {
    return {
        ...MEDIASOUP_CONFIG,
        webRtcTransport: {
            ...MEDIASOUP_CONFIG.webRtcTransport,
            listenIps: [
                {
                    ip: LISTEN_IP || '0.0.0.0',
                    announcedIp: ANNOUNCED_IP || ipv4,
                },
            ],
        }
    };
}

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
    getInitialRouter,
    getDefaultMediasoupConfig
}
