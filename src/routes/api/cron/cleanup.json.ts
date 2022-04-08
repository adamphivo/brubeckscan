import CronService from "$lib/services/cron";

export async function get() {
    try {
        const run = await CronService.cleanUp();

        return {
            status: 200,
            body: {
                data: {
                    cronRun: run
                }
            }
        };
    } catch (e) {
        return {
            status: e.status || 500,
            body: {
                cronRun: e.message
            }
        };
    }
}