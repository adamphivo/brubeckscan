import streamr from "$lib/clients/streamr";
import { feed } from "$lib/stores/streams/feed";

const STREAM_ID = import.meta.env.VITE_STREAMR_FEED_STREAMID as string;

const feedStream = () => {};

feedStream.getDescription = () => {
  return "Gives information about the network & app every minute";
};

feedStream.getId = () => {
  return STREAM_ID;
};

feedStream.getAndSubscribe = async () => {
  // Guard against double subs
  const subscriptions = await streamr.getSubscriptions();
  const alreadySub = subscriptions.find((sub) => {
    return sub.streamPartId.includes(STREAM_ID);
  });
  if (alreadySub) return;
  const stream = await streamr.getOrCreateStream({
    id: STREAM_ID,
  });

  return await streamr.subscribe(stream.id, feedStream.onMessage);
};

feedStream.unsubscribe = async () => {
  return await streamr.unsubscribe(STREAM_ID);
};

feedStream.publish = async (type: string, content: string) => {
  const msg = {
    type,
    content,
  };

  await streamr.publish(
    `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${STREAM_ID}`,
    msg
  );
};

feedStream.onMessage = async (content: any, metadata: any) => {
  // We attach the message metadata to the content object as well
  content.metadata = metadata;
  feed.update((previous) => {
    if (previous.messages.length >= 100) {
      previous.messages.shift();
      previous.messages.push(content);
      return {
        messages: previous.messages,
      };
    } else {
      return { messages: [...previous.messages, content] };
    }
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
