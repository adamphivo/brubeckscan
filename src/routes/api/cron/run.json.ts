import CronService from "$lib/services/cron";

export async function get() {
    try {
        CronService.run();

        return {
            status: 200,
            body: {
                data: {
                    message: "Cron run started :)"
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