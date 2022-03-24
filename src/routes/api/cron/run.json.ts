import CronService from "$lib/services/cron";

export async function get() {
    try {
        const run = await CronService.run();

        return {
            status: 200,
            body: {
                data: {
                    message: run
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