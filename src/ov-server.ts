const ovserver = require('./../build/Release/ovserver.node');

export interface OvServerT {
    stop(): void;
}

const OvServer: {
    new(port: number, prio: number, group: string, name: string): OvServerT;
} = ovserver.OvServerWrapper

export default OvServer;
