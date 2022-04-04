import { send } from "$lib/helpers/send";

export async function getWatchlist(nodes: any) {
    const requests = nodes.map((node) => {
        return send("GET", `brubeck/node/${node.address}.json`);
    });

    const responses = await Promise.all(requests);

    const data = await Promise.all(
        responses.map((response) => response.json())
    );

    const decoratedWatchlist = data.map(item => {
        const dataDB = nodes.find((node) => node.address === item.address);
        item.dataDB = dataDB;
        return item;
    });

    decoratedWatchlist.sort((a: any, b: any) => {
        const sort = (new Date(a.dataDB.createdAt) as any) - (new Date(b.dataDB.createdAt) as any);
        return sort;
    });

    return decoratedWatchlist;
}