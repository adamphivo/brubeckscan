import streamr from "$lib/clients/streamr";
import { feedStream } from "./feed";
import { chatStream } from "./chat";
import { mapStream } from "./map";
import { logsStream } from "./logs";

const StreamService = () => {};

StreamService.unsubscribeAll = async () => {
  await streamr.unsubscribeAll();
};

StreamService.feedStream = feedStream;
StreamService.chatStream = chatStream;
StreamService.mapStream = mapStream;
StreamService.logsStream = logsStream;

export default StreamService;
