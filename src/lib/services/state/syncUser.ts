import StreamService from "$lib/services/stream";
import UserService from "$lib/services/user";
import { anonymousUserUid } from "$lib/stores/user";
import { get } from "svelte/store";

function getRandom() {
  const randomY = Math.floor(Math.random() * 100) + "%";
  const randomX = Math.floor(Math.random() * 100) + "%";
  return { randomX, randomY };
}

export async function syncUser(user: any): Promise<void> {
  const coordinates = getRandom();
  if (user) {
    await StreamService.mapStream.publish({
      userGradient: user.profile.gradient,
      userAddress: user.address,
      posX: coordinates.randomX,
      posY: coordinates.randomY,
    });

    await UserService.login(user.address, false);
  } else {
    await StreamService.mapStream.publish({
      userGradient: "lightgrey",
      userAddress: get(anonymousUserUid),
      posX: coordinates.randomX,
      posY: coordinates.randomY,
    });
  }
}
