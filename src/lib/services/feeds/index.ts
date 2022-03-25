import streamr from "$lib/clients/streamr";

const FeedService = () => { };

FeedService.publish = async (type: string, content: string) => {
    const msg = {
        type,
        content
    };

    await streamr.publish(
        "0xd9925689cb36bfc3e2f82ddacda21c231e126ee8/brubeckscan/test",
        msg
    );
};


export default FeedService;