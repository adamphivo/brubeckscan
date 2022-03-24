<script lang="ts">
    import MdBookmarkBorder from "svelte-icons/md/MdBookmarkBorder.svelte";
    import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
    import { userData, watchListData } from "$lib/stores/userData";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { send } from "$lib/helpers/send";

    $: userHasNode = $userData.nodes.find((node) => {
        return node.address == $scannedNodeData.address;
    });

    $: isOwner = $scannedNodeData?.address === $userData?.address

    async function unwatch() {
        if(!isOwner){
            const response = await send("PATCH", "watchlist.json", {
                userAddress: $userData.address,
                nodeAddress: $scannedNodeData.address,
                action: "unwatch",
            });
    
            const user = await response.json();
    
            if (user) {
                $watchListData = $watchListData.filter(
                    (node) => node.address !== $scannedNodeData.address
                );
            }
    
            $userData = user;
        } else {
            return;
        }
    }

    async function watch() {
        const response = await send("PATCH", "watchlist.json", {
            userAddress: $userData.address,
            nodeAddress: $scannedNodeData.address,
            action: "watch",
        });

        const user = await response.json();

        if (user) {
            $watchListData = [...$watchListData, $scannedNodeData];
        }

        $userData = user;
    }
</script>

<div class="bookmark">
    {#if userHasNode}
        <div class="icon {isOwner ? 'noDelete': ''}" title="Unwatch" on:click|preventDefault={unwatch}>
            <MdBookmark />
        </div>
    {:else}
        <div class="icon" title="Watch" on:click|preventDefault={watch}>
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
