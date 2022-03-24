<script lang="ts">
    import MdBookmarkBorder from "svelte-icons/md/MdBookmarkBorder.svelte";
    import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
    import UserService from "$lib/services/user";
    import { userData, watchListData } from "$lib/stores/userData";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { send } from "$lib/helpers/send";

    $: userHasNode = $userData.nodes.find((node) => {
        return node.address == $scannedNodeData.address;
    });

    $: isOwner = $scannedNodeData?.address === $userData?.address;

    async function update(action: string) {
        // A owner cannot delete his node from his watchlist
        if (isOwner && action === "unwatch") return;

        const response = await send("PATCH", "watchlist.json", {
            userAddress: $userData.address,
            nodeAddress: $scannedNodeData.address,
            action: action,
        });

        const user = await response.json();

        const data = await UserService.getWatchlist(user.nodes);

        if (data) {
            $watchListData = data;
        }

        $userData = user;
    }
</script>

<div class="bookmark">
    {#if userHasNode}
        <div
            class="icon {isOwner ? 'noDelete' : ''}"
            title="Unwatch"
            on:click|preventDefault={() => update("unwatch")}
        >
            <MdBookmark />
        </div>
    {:else}
        <div
            class="icon"
            title="Watch"
            on:click|preventDefault={() => update("watch")}
        >
            <MdBookmarkBorder />
        </div>
    {/if}
</div>

<style lang="scss">
    .bookmark {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .icon {
        width: 30px;
        cursor: pointer;
        transition-duration: 0.2s;
    }

    .icon:hover {
        transform: scale(1.1);
    }

    .icon.noDelete {
        &:hover {
            cursor: not-allowed;
            transform: unset;
        }
    }
</style>
