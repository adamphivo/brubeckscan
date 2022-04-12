<script lang="ts">
    import Button from "$lib/components/Elements/Button.svelte";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { userData } from "$lib/stores/user";
    import { send } from "$lib/helpers/send";
    import { validate } from "$lib/helpers/validate";

    let address = "";

    if ($userData) {
        address = $scannedNodeData.address || $userData.address
    }

    async function scan() {
        if (address) {
            if (validate.ethAddress(address)) {
                const response = await send(
                    "GET",
                    `nodes/${address.toLowerCase()}.json`
                );
                const node = await response.json();

                if (node) {
                    $scannedNodeData = node;
                }
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }
    const placeholder = "Enter a node public ETH key"
</script>

<div class="module">
    <div class="scanner">
        <input bind:value={address} placeholder={placeholder} />
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
            font-size: 18px;
        }
    }

    .module {
        border: 0;
        width: 100%;
        padding: 0;
    }
</style>
