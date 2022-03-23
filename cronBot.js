import cron from "node-cron";
import fetch from "node-fetch";

cron.schedule('*/5 * * * *', async () => {
    const init = {
        method: 'GET',
        headers: {
            internal_token: 'poissonrouge'
        }
    }

    const response = await fetch("http://localhost:3000/api/cron/run.json", init);
    const data = await response.json();
    console.log(data);
});