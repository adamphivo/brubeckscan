import { send } from "$lib/helpers/send";

export async function getNodesData(nodes: any) {
    const requests = nodes.map((node) => {
        return send("GET", `brubeck/node/${node.address}.json`);
    });

    const responses = await Promise.all(requests);

    const data = await Promise.all(
        responses.map((response) => response.json())
    );

    return data;
}