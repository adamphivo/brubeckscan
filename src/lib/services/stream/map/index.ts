import { get } from "svelte/store";
import streamr from "$lib/clients/streamr";
import { userData } from "$lib/stores/user";

const mapStream = () => {};

mapStream.publish = async (message: object) => {
  await streamr.publish(
    `0xd9925689cb36bfc3e2f82ddacda21c231e126ee8${
      import.meta.env.VITE_STREAMR_MAP_STREAMID
    }`,
    message
  );
};

mapStream.onMessage = async (content: any, metadata: any) => {
  content.metadata = metadata;
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
      point.title = content.userAddress;
      map.append(point);
    }
  }
};

export { mapStream };
