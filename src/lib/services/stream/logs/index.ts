import streamr from "$lib/clients/streamr";
import { logs } from "$lib/stores/streams/logs";

const STREAM_ID = import.meta.env.VITE_STREAMR_LOGS_STREAMID as string;

const logsStream = () => {};

logsStream.getDescription = () => {
  return "Internal & external requests received by BrubeckScan";
};

logsStream.getId = () => {
  return STREAM_ID;
};

logsStream.getAndSubscribe = async () => {
  // Guard against double subs
  const subscriptions = await streamr.getSubscriptions();
  const alreadySub = subscriptions.find((sub) => {
    return sub.streamPartId.includes(STREAM_ID);
  });
  if (alreadySub) return;
  const stream = await streamr.getOrCreateStream({
    id: STREAM_ID,
  });

  return await streamr.subscribe(stream.id, logsStream.onMessage);
};

logsStream.unsubscribe = async () => {
  await streamr.unsubscribe(STREAM_ID);
};

logsStream.publish = async (event: any, error = null) => {
  let ev;
  ev = {
    method: event.request.method,
    routeId: event.routeId,
  };
  if (error) {
    ev.error = error;
  }
  await streamr.publish(
    `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${STREAM_ID}`,
    ev
  );
};

logsStream.onMessage = async (content: any, metadata: any) => {
  content.metadata = metadata;
  logs.update((previous) => [...previous.slice(-100), content]);
  setTimeout(logsStream.scrollToBottom, 100);
};

logsStream.scrollToBottom = () => {
  const logs = document.querySelector("#logs");
  if (!logs) return;
  logs.scrollTo({
    top: logs.scrollHeight,
    behavior: "smooth",
  });
};

export { logsStream };
