<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData } from "$lib/stores/userData";

    export let node;

    let copyText = "Copy";

    function copyAddressToClipboard(toCopy: string) {
        navigator.clipboard.writeText(node.address);
        copyText = "Copied";
        setTimeout(() => (copyText = "Copy"), 2000);
    }

    let background =
        node.address === $userData.address ? $userData.profile.gradient : "";
</script>

<td style:background class="address">
    <div class="container">
        <div>
            {Format.shortenNodeAddress(node.address)}
        </div>
        <button on:click={() => copyAddressToClipboard(node.address)}>
            {copyText}
        </button>
    </div>
</td>

<style lang="scss">
    td {
        width: 20%;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
