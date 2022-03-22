<script lang="ts">
    import Button from "$lib/components/modules/Elements/Button.svelte";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { send } from "$lib/helpers/send";

    let address = $scannedNodeData?.address || "";

    async function scan() {
        if (address) {
            const response = await send(
                "GET",
                `brubeck/node/${address.toLowerCase()}.json`
            );
            const node = await response.json();

            if (node) {
                $scannedNodeData = node;
            }
        } else {
            throw new Error();
        }
    }
</script>

<div class="module">
    <div class="scanner">
        <input
            bind:value={address}
            placeholder="ETH Public Key"
        />
        <Button action={scan} text="Scan" />
    </div>
</div>

<style lang="scss">
    .scanner {
        display: flex;
        align-items: stretch;
        gap: 10px;
        input {
            flex-grow: 1;
        }
    }
</style>
