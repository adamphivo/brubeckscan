import { derived } from "svelte/store";
import { session } from "$app/stores"

const testStore = derived(session, function getData($session) {
    if ($session.user) {
        return $session.user.nodelists.length;
    } else {
        return false;
    }
})

export default testStore;