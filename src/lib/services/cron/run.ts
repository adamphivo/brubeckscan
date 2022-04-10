import prisma from "$lib/clients/prisma";
import { tasks } from "./tasks";
import StreamService from "$lib/services/stream";

export async function run() {
    await StreamService.feedStream.publish("cronRun", "Run started 🤖");
    const start = Date.now();
    try {
        const results = await Promise.all(tasks.map(task => task()));
        const stop = Date.now();
        const runTimeInSeconds = (stop - start) / 1000;
    
        await prisma.cronRun.create({
            data: {
                finalStatus: 1,
                runTimeInSeconds: runTimeInSeconds
            }
        });
        
        await StreamService.feedStream.publish("cronRun", `CRON Run done in ${runTimeInSeconds} seconds 🔥`);
    
        return {
            finalStatus: "OK",
            cronRunTimeInSeconds: runTimeInSeconds,
            results
        };
    } catch(e) {
        const stop = Date.now();
        const runTimeInSeconds = (stop - start) / 1000;
        await prisma.cronRun.create({
            data: {
                finalStatus: 0,
                runTimeInSeconds: runTimeInSeconds,
                errorMessage: e.message
            }
        });
        await StreamService.feedStream.publish("cronRun", `CRON Run errored in ${runTimeInSeconds} seconds 🐛`);
        return {
            finalStatus: "KO",
            cronRunTimeInSeconds: runTimeInSeconds,
            error: e
        };
    }

}