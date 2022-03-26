import FeedService from "$lib/services/feeds";

export async function get() {
    await FeedService.publish("hello", "Welcome and thank you for using BrubeckScan ✨");
    return {
        status: 200,
        body: {}
    };
}