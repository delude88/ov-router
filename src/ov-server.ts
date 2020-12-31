const ovserver = require('./../build/Release/ovserver.node');

export interface OvServer {
    hello(): string;
    start(): void;
}

const OvServer: {
    new(port: number, prio: number, group: string): OvServer;
} = ovserver.OvServerWrapper

export default OvServer;
