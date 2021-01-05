import ITeckosClient from "teckos-client/dist/ITeckosClient";
import {ClientRouterEvents, ServerRouterEvents} from "../../events";
import Stage from "../../model/Stage";
import OvServer, {OvServerT} from "./ov-server";

class OvService {
    private readonly serverConnection: ITeckosClient;
    private readonly ipv4: string;
    private readonly ipv6: string;
    private managedStages: {
        [stageId: string]: {
            stage: Stage,
            ovServer: OvServerT
        }
    } = {};
    private ports: string[] = [];

    constructor(serverConnection: ITeckosClient, ipv4: string, ipv6?: string) {
        this.serverConnection = serverConnection;
        this.ipv4 = ipv4;
        this.ipv6 = ipv6;
        this.attachHandlers();
    }

    private attachHandlers = () => {
        this.serverConnection.on(ServerRouterEvents.MANAGE_STAGE, this.manageStage);
        this.serverConnection.on(ServerRouterEvents.UN_MANAGE_STAGE, this.unManageStage);
    }

    private manageStage = (stage: Stage) => {
        if (!this.managedStages[stage._id]) {
            const port = this.ports.length;
            const ovServer = new OvServer(50000, 50, "digitalstage", "mystage");
            this.managedStages[stage._id] = {
                stage,
                ovServer
            };
            this.ports[port] = stage._id;
            this.serverConnection.emit(ClientRouterEvents.STAGE_MANAGED, {
                id: stage._id,
                ovServer: {
                    ipv4: this.ipv4,
                    ipv6: this.ipv6,
                    port
                }
            });
        }
    }
    private unManageStage = (stageId: string) => {
        if (this.managedStages[stageId]) {
            this.managedStages[stageId].ovServer.stop();
            delete this.managedStages[stageId];
            this.serverConnection.emit(ClientRouterEvents.STAGE_UN_MANAGED, stageId);
        }
    }

}

export default OvService;
