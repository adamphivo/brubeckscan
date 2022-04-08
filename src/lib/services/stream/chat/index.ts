import streamr from "$lib/clients/streamr";
import { chatMessages } from "$lib/stores/streams/chat";

const chatStream = () => { };

chatStream.publish = async (userAddress: string, userGradient: string, message: string) => {
    const msg = {
        userAddress,
        userGradient,
        message
    };

    await streamr.publish(
        `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${import.meta.env.VITE_STREAMR_CHAT_STREAMID}`,
        msg
    );
};

chatStream.onMessage = async (content: any, metadata: any) => {
    // We attach the message metadata to the content object as well
    content.metadata = metadata;
    // Update messages store
    chatMessages.update(function (previous) {
        return [...previous, content];
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

export { chatStream };