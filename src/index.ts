import OvServer from "./ov-server";

const ov = new OvServer(50000, 50, "digitalstage");
console.log(ov.hello());
console.log("bye")

ov.start();
