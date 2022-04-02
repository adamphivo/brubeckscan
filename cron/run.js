import cron from "node-cron";
import fetch from "node-fetch";
import "dotenv/config";

cron.schedule("*/1 * * * *", async () => {
    const init = {
        method: "GET",
        headers: {
            internalToken: process.env.VITE_AUTH_TOKEN
        }
    };

    const response = await fetch("http://localhost:3000/api/cron/hello.json", init);
    const data = await response.json();
    console.log(data);
});

cron.schedule("*/30 * * * *", async () => {
    const init = {
        method: "GET",
        headers: {
            internalToken: process.env.VITE_AUTH_TOKEN
        }
    };

    const response = await fetch("http://localhost:3000/api/cron/run.json", init);
    const data = await response.json();
    console.log(data);
});