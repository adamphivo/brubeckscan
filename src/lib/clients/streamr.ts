import { StreamrClient } from "streamr-client";

const streamr = new StreamrClient({
    auth: {
        privateKey: import.meta.env.VITE_STREAMR_ACCOUNT as string
    }
});

export default streamr;

