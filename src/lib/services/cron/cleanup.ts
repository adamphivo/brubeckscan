import StreamService from "$lib/services/stream";
import prisma from "$lib/clients/prisma";

export async function cleanup() {
  await StreamService.feedStream.publish("cronRun", "Cleaning started ♻️");
  const start = Date.now();
  // Cleanup weird nodes
  const nodes = await prisma.node.findMany({});
  nodes.forEach(async (node) => {
    if (node.address.length !== 42) {
      await prisma.node.delete({
        where: {
          id: node.id,
        },
      });
    }
  });

  const stop = Date.now();

  const runTimeInSeconds = (stop - start) / 1000;

  await StreamService.feedStream.publish(
    "cronRun",
    `Cleaning done in ${runTimeInSeconds} seconds 🌴`
  );
}
