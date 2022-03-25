import prisma from "$lib/clients/prisma";
import { tasks } from "./tasks";
import FeedService from "../feeds";

export async function run() {
    await FeedService.publish("cronRun", "CRON Run started 🤖");
    const start = Date.now();

    const results = await Promise.all(tasks.map(task => task()));

    const stop = Date.now();
    const runTimeInSeconds = (stop - start) / 1000;

    await prisma.cronRun.create({
        data: {
            finalStatus: 1,
            runTimeInSeconds: runTimeInSeconds
        }
    });
    
    await FeedService.publish("cronRun", `CRON Run done in ${runTimeInSeconds} seconds 🔥`);

    return {
        finalStatus: "OK",
        cronRunTimeInSeconds: runTimeInSeconds,
        results
    };
}