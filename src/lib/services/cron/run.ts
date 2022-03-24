import prisma from "$lib/clients/prisma";
import { tasks } from "./tasks";

export async function run() {
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

    return {
        finalStatus: "OK",
        cronRunTimeInSeconds: runTimeInSeconds,
        results
    };
}