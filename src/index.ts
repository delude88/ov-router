import OvServer, {OvServerT} from "./ov-server";
import {TeckosClient} from "teckos-client";
import {API_KEY, API_URL} from "./env";
import {
    ClientRouterEvents,
    ClientStageEvents,
    ServerGlobalEvents,
    ServerRouterEvents,
    ServerStageEvents
} from "./events";
import Stage from "./model/Stage";
import {getInitialRouter} from "./utils";
import debug from "debug";
import OvService from "./services/OvService";
import {MediasoupConfiguration} from "./services/MediasoupService";

const info = debug("router");
const warn = info.extend("warn");
const error = info.extend("error");

const config: MediasoupConfiguration = {
    ...MEDIASOUP_CONFIG,
    webRtcTransport: {
        ...MEDIASOUP_CONFIG.webRtcTransport,
        listenIps: [
            {
                ip: LISTEN_IP || '0.0.0.0',
                announcedIp: ANNOUNCED_IP || router.ipv4,
            },
        ],
    },
};

const startService = () => {
    return getInitialRouter()
        .then((initialRouter) => {
            const serverConnection = new TeckosClient(API_URL);

            const ovService = new OvService(serverConnection, initialRouter.ipv4, initialRouter.ipv6);

            serverConnection.on(ServerGlobalEvents.READY, (router) => {

            });

            serverConnection.on("connect", () => {
                // Send initial router and authorize via api key
                serverConnection.emit("router", {
                    apiKey: API_KEY,
                    router: initialRouter
                })
            })
            serverConnection.connect();
        });
}

startService()
    .then(() => info("Running on port " + ))
