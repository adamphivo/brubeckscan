import { get } from "svelte/store";
import streamr from "$lib/clients/streamr";
import { userData } from "$lib/stores/user";
import Format from "$lib/helpers/format";

const STREAM_ID = import.meta.env.VITE_STREAMR_MAP_STREAMID as string;

const mapStream = () => {};

mapStream.getId = () => {
  return STREAM_ID;
};

mapStream.getDescription = () => {
  return "Each block represents an instance of the app. Everytime it is synced with the network, it moves to another random location.";
};

mapStream.getAndSubscribe = async () => {
  // Guard against double subs
  const subscriptions = await streamr.getSubscriptions();
  const alreadySub = subscriptions.find((sub) => {
    return sub.streamPartId.includes(STREAM_ID);
  });
  if (alreadySub) return;
  const stream = await streamr.getOrCreateStream({
    id: STREAM_ID,
  });

  return await streamr.subscribe(stream.id, mapStream.onMessage);
};

mapStream.unsubscribe = async () => {
  return await streamr.unsubscribe(STREAM_ID);
};

mapStream.publish = async (message: object) => {
  await streamr.publish(
    `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${STREAM_ID}`,
    message
  );
};

mapStream.onMessage = async (content: any, metadata: any) => {
  content.metadata = metadata;
  if (!content.userAddress) return;
  const point = document.getElementById(content.userAddress);
  if (point) {
    point.style.top = content.posY;
    point.style.left = content.posX;
  } else {
    const map = document.getElementById("map");
    if (map) {
      const point = document.createElement("div");
      const user = get(userData);
      if (user && user.address === content.userAddress) {
        point.classList.add("owner");
      }
      point.classList.add("point");
      if (content.userGradient === "lightgrey") {
        point.classList.add("anonymous");
      }
      point.style.top = content.posY;
      point.style.left = content.posX;
      point.style.background = content.userGradient;
      point.id = content.userAddress;
      point.title = Format.shortenNodeAddress(content.userAddress);
      map.append(point);
    }
  }
};

export { mapStream };
