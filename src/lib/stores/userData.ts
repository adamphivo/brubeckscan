import { writable, derived } from "svelte/store";
import { send } from "$lib/helpers/send";

const defaultUserData = {
    nodes: []
}

const defaultUserDataComputed = {
    nodes: []
}

export const userData = writable(defaultUserData);

export const userDataComputed = derived(userData, ($userData, set) => {
    if (!$userData) {
        return set(null);
    }

    getNodesData($userData.nodes).then(nodes => {
        return set({
            nodes: nodes
        })
    });
}, defaultUserDataComputed);


async function getNodesData(nodes: any) {
    const requests = nodes.map((node) => {
        return send(
            "GET",
            `brubeck/node/${node.address}.json`
        );
    });

    const responses = await Promise.all(requests);

    const data = await Promise.all(
        responses.map((response) => response.json())
    );

    return data;
}