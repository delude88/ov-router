import {TeckosClient} from "teckos-client";
import {API_KEY, API_URL, PORT} from "./env";
import {
    ServerGlobalEvents,
} from "./events";
import {getDefaultMediasoupConfig, getInitialRouter} from "./utils";
import debug from "debug";
import OvService from "./services/OvService";
import MediasoupService from "./services/MediasoupService";

const info = debug("router");
const warn = info.extend("warn");
const error = info.extend("error");


let ovService: OvService;
let mediasoupService: MediasoupService;

const startService = () => {
    return getInitialRouter()
        .then((initialRouter) => {
            info("Using public IPv4 " + initialRouter.ipv4);
            info("Using public IPv6 " + initialRouter.ipv6);

            const serverConnection = new TeckosClient(API_URL);

            const mediasoupConfig = getDefaultMediasoupConfig(initialRouter.ipv4);

            ovService = new OvService(serverConnection, initialRouter.ipv4, initialRouter.ipv6);

            serverConnection.on(ServerGlobalEvents.READY, (router) => {
                info("Successful authenticated on API server");
                mediasoupService = new MediasoupService(PORT, serverConnection, router, mediasoupConfig);
                mediasoupService.init()
                    .then(() => {
                        info("Running mediasoup on port " + PORT);
                    })
                    .catch(err => error(err));
            });

            serverConnection.on("disconnect", () => {
                warn("Disconnected from API server");
                if (mediasoupService) {
                    mediasoupService.close();
                    mediasoupService = undefined;
                }
            });

            serverConnection.on("connect", () => {
                info("Successful connected to API server");
                // Send initial router and authorize via api key
                serverConnection.emit("router", {
                    apiKey: API_KEY,
                    router: initialRouter
                })
            })

            serverConnection.connect();
        });
}

info("Starting service...");
startService()
    .then(() => info("Service started!"))
    .catch((err) => error(err));
