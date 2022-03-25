import { StreamrClient } from "streamr-client";

const streamr = new StreamrClient({
    auth: {
        privateKey: "0xf6391439bcdf7477c92a622884125b372f9efa0e7921989639bbbe058646c06d"
    }
});

export default streamr;

