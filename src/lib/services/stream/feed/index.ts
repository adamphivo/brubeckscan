import streamr from "$lib/clients/streamr";
import Consts from "$lib/consts";
import { feed } from "$lib/stores/streams/feed";

const feedStream = () => { };

feedStream.publish = async (type: string, content: string) => {
    const msg = {
        type,
        content
    };

    await streamr.publish(
        `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${Consts.streamr.FEED_STREAM_ID}`,
        msg
    );
};

feedStream.onMessage = async (content: any, metadata: any) => {
    // We attach the message metadata to the content object as well
    content.metadata = metadata;
    feed.update(previous => {
        return { messages: [...previous.messages, content] };
    });
    setTimeout(feedStream.scrollFeedToBottom, 100);
};

feedStream.scrollFeedToBottom = () => {
    const feed = document.querySelector("#feed");
    if (!feed) return;
    feed.scrollTo({
        top: feed.scrollHeight,
        behavior: "smooth",
    });
};

export { feedStream };