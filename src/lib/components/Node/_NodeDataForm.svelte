<script lang="ts">
    import { onMount } from "svelte";
    import { session } from "$app/stores";
    import Button from "$lib/components/HTMLElements/Button.svelte";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { userData } from "$lib/stores/userData";
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
                    `brubeck/node/${address.toLowerCase()}.json`
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
</script>

<div class="module">
    <div class="scanner">
        <input bind:value={address} placeholder="Node ETH Public Key" />
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

    .module {
        border: 0;
        width: 100%;
    }
</style>
