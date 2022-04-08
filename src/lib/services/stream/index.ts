import streamr from "$lib/clients/streamr";
import { feedStream } from "./feed";
import { chatStream } from "./chat";

const StreamService = () => { };

StreamService.unsubscribeAll = async () => {
    await streamr.unsubscribeAll();
};

StreamService.bundle = async () => {
    await StreamService.unsubscribeAll();

    const getFeed = await streamr.getOrCreateStream({
        id: import.meta.env.VITE_STREAMR_FEED_STREAMID as string,
    });

    const getChat = await streamr.getOrCreateStream({
        id: import.meta.env.VITE_STREAMR_CHAT_STREAMID as string,
    });

    const [ feedStream, chatStream ] = await Promise.all([getFeed, getChat]);

    const sub1  = streamr.subscribe(
        {
            id: chatStream.id,
            resend: {
                last: 50,
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