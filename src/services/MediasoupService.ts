import {ITeckosProvider, UWSProvider} from 'teckos';
import * as mediasoup from "mediasoup";
import Router from "../model/Router";
import {ITeckosClient} from "teckos-client";
import * as uWS from 'teckos/uws';
import {TemplatedApp} from "teckos/uws";

export interface MediasoupConfiguration {
    worker: mediasoup.types.WorkerSettings,
    router: mediasoup.types.RouterOptions,
    webRtcTransport: mediasoup.types.WebRtcTransportOptions & {
        maxIncomingBitrate?: number,
        minimumAvailableOutgoingBitrate?: number
    }
}

class MediasoupService {
    private readonly provider: TemplatedApp;
    private readonly socket: ITeckosProvider;
    private readonly router: Router;
    private readonly config: MediasoupConfiguration;

    constructor(port: number, serverConnection: ITeckosClient, router: Router, config: MediasoupConfiguration) {
        this.provider = uWS.App();
        this.socket = new UWSProvider(this.provider);
        this.attachRestHandlers();
        this.router = router;
        this.config = config;
    }

    private attachRestHandlers = () => {
        this.provider.get('/ping', (res) => {
            res
                .writeHeader('Content-Type', 'image/svg+xml')
                .end('<svg height="200" width="580" xmlns="http://www.w3.org/2000/svg">\n'
                    + '    <path d="m-1-1h582v402h-582z"/>\n'
                    + '    <path d="m223 148.453125h71v65h-71z" stroke="#000" stroke-width="1.5"/>\n'
                    + '</svg>');
        });
        this.provider.get('/ping', (res) => {
            res
                .writeHeader('Content-Type', 'image/svg+xml')
                .end('<svg height="200" width="580" xmlns="http://www.w3.org/2000/svg">\n'
                    + '    <path d="m-1-1h582v402h-582z"/>\n'
                    + '    <path d="m223 148.453125h71v65h-71z" stroke="#000" stroke-width="1.5"/>\n'
                    + '</svg>');
        });
    }

    private attachSocketHandlers = () => {

    }


}
export default MediasoupService;
