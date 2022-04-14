import streamr from "$lib/clients/streamr";
import { chatMessages } from "$lib/stores/streams/chat";

const STREAM_ID = import.meta.env.VITE_STREAMR_CHAT_STREAMID as string;

const chatStream = () => {};

chatStream.getDescription = () => {
  return "Messages are stored using a storage node for persistence";
};

chatStream.getId = () => {
  return STREAM_ID;
};

chatStream.getAndSubscribe = async () => {
  // Guard against double subs
  const subscriptions = await streamr.getSubscriptions();
  const alreadySub = subscriptions.find((sub) => {
    return sub.streamPartId.includes(STREAM_ID);
  });
  if (alreadySub) return;
  const stream = await streamr.getOrCreateStream({
    id: STREAM_ID,
  });

  return await streamr.subscribe(
    {
      id: stream.id,
      resend: {
        last: 20,
      },
    },
    chatStream.onMessage
  );
};

chatStream.unsubscribe = async () => {
  return await streamr.unsubscribe(STREAM_ID);
};

chatStream.publish = async (
  userAddress: string,
  userGradient: string,
  message: string
) => {
  const msg = {
    userAddress,
    userGradient,
    message,
  };

  await streamr.publish(
    `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${STREAM_ID}`,
    msg
  );
};

chatStream.onMessage = async (content: any, metadata: any) => {
  // We attach the message metadata to the content object as well
  content.metadata = metadata;
  // Update messages store
  chatMessages.update(function (previous) {
    if (isMessageInStore(previous, content)) {
      // Check if message is already in store
      return previous;
    } else {
      return [...previous, content];
    }
  });
  setTimeout(chatStream.scrollToBottom, 100);
};

chatStream.scrollToBottom = () => {
  const chat = document.querySelector("#chat");
  if (!chat) return;
  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth",
  });
};

function isMessageInStore(store: any, message: any): boolean {
  const exist = store.find((item) => {
    if (
      item.userAddress === message.userAddress &&
      item.metadata.messageId.timestamp === message.metadata.messageId.timestamp
    ) {
      return true;
    } else {
      return false;
    }
  });

  return exist ? true : false;
}

export { chatStream };
