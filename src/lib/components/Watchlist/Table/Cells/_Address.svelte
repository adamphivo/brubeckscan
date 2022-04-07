<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData } from "$lib/stores/userData";
    import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";

    export let node;

    let copyText = "";

    function copyAddressToClipboard() {
        navigator.clipboard.writeText(node.address);
        copyText = "Copied";
        setTimeout(() => (copyText = ""), 2000);
    }

    let background =
        node.address === $userData.address ? $userData.profile.gradient : "";
</script>

<td style:background class="address">
    <div class="container">
        <div>
            {Format.shortenNodeAddress(node.address)}
        </div>
        <div on:click={() => copyAddressToClipboard()}>
            {#if copyText}
                {copyText}
            {:else}
            <div class="iconi" title="Copy address to clipboard">
                <MdContentCopy />
            </div>
            {/if}
        </div>
    </div>
</td>

<style lang="scss">
    td {
        width: 20%;
    }
    .iconi {
        width: 20px;
        cursor: pointer;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 0 20px;
    }
</style>
