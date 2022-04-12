import streamr from "$lib/clients/streamr";
import { map } from "$lib/stores/streams/map";

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
  map.update((previous) => [...previous.filter(item => item.userAddress !== content.userAddress), content]);
};

export { mapStream };
