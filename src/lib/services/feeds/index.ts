import streamr from "$lib/clients/streamr";
import Consts from "$lib/consts";

const FeedService = () => { };

FeedService.publish = async (type: string, content: string) => {
    const msg = {
        type,
        content
    };

    await streamr.publish(
        `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${Consts.streamr.FEED_STREAM_ID}`,
        msg
    );
};


export default FeedService;