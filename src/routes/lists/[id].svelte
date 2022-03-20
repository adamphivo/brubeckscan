<script lang="ts" context="module">
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import { page } from "$app/stores";
    import Node from "$lib/components/modules/Node/Node.svelte";

    let list = null;

    onMount(async () => {
        if (browser) {
            if ($session.user) {
                const find = $session.user.nodelists.find(
                    (list) => list.id == $page.params.id
                );

                if (find) {
                    list = find;
                } else {
                    goto("/");
                }
            }
        }
    });
</script>

<!-- Table -->
{#if list}
<div class="modulePool">
    <div class="module">
        <table>
            <thead>
                <tr>
                    <th>nodeAddress</th>
                    <th>rewardInData</th>
                    <th>rewardInUsdt</th>
                    <th>claimCount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each list.nodes as node}
                    <Node address={node.address} mode="table"/>
                {/each}
            </tbody>
        </table>
    </div>
</div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
        border: none;
        padding: 40px;
    }
</style>
