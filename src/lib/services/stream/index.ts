import streamr from "$lib/clients/streamr";
import { feedStream } from "./feed";

const StreamService = () => {};

StreamService.unsubscribeAll = async () => {
    await streamr.unsubscribeAll();
};

StreamService.feedStream = feedStream;

export default StreamService;