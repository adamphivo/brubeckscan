<script lang="ts">
    import Button from "$lib/components/Elements/Button.svelte";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { userData } from "$lib/stores/user";
    import { send } from "$lib/helpers/send";
    import { validate } from "$lib/helpers/validate";
    import MdSearch from 'svelte-icons/md/MdSearch.svelte';
    import MdYoutubeSearchedFor from 'svelte-icons/md/MdYoutubeSearchedFor.svelte';

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
                    console.log(node);
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
        <Button action={scan} icon={MdSearch} size="26px"/>
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
        background-color: transparent;
    }
</style>
