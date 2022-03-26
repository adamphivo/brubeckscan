import cron from "node-cron";
import fetch from "node-fetch";

cron.schedule("*/30 * * * * *", async () => {
    const init = {
        method: "GET",
        headers: {
            internal_token: "poissonrouge"
        }
    };

    const response = await fetch("http://localhost:3000/api/cron/hello.json", init);
    const data = await response.json();
    console.log(data);
});

cron.schedule("*/1 * * * *", async () => {
    const init = {
        method: "GET",
        headers: {
            internal_token: "poissonrouge"
        }
    };

    const URLS = ["http://localhost:3000/api/market/prices.json", "http://localhost:3000/api/brubeck/stats.json", "http://localhost:3000/api/users.json"];

    const promises = URLS.map(url => fetch(url, init));

    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(response => response.json()));
    console.log(data);
});

cron.schedule("*/30 * * * *", async () => {
    const init = {
        method: "GET",
        headers: {
            internal_token: "poissonrouge"
        }
    };

    const response = await fetch("http://localhost:3000/api/cron/run.json", init);
    const data = await response.json();
    console.log(data);
});