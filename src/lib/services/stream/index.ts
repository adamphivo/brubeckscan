import streamr from "$lib/clients/streamr";
import { feedStream } from "./feed";
import { chatStream } from "./chat";
import { STREAMR_STORAGE_NODE_GERMANY } from "streamr-client";

const StreamService = () => { };

StreamService.unsubscribeAll = async () => {
    await streamr.unsubscribeAll();
};

StreamService.bundle = async () => {
    await StreamService.unsubscribeAll();

    const feedStream = await streamr.getOrCreateStream({
        id: import.meta.env.VITE_STREAMR_FEED_STREAMID as string,
    });

    const chatStream = await streamr.getOrCreateStream({
        id: import.meta.env.VITE_STREAMR_CHAT_STREAMID as string,
    });

    const chatStorage = await chatStream.getStorageNodes();

    if (chatStorage.length === 0) {
        await chatStream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY);
    }

    const sub1  = streamr.subscribe(
        {
            id: chatStream.id,
            resend: {
                last: 100,
            },
        },
        StreamService.chatStream.onMessage
    );

    const sub2 = streamr.subscribe(
        feedStream.id,
        StreamService.feedStream.onMessage
    );

    await Promise.all([sub1, sub2]);
}

StreamService.feedStream = feedStream;
StreamService.chatStream = chatStream;

export default StreamService;