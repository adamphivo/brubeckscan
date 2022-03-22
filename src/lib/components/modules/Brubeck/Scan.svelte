<script lang="ts">
    import { send } from "$lib/helpers/send";
    import { session } from "$app/stores";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import Button from "$lib/components/modules/Elements/Button.svelte";

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
            placeholder="Enter an ethereum public key"
        />
        <Button action={scan} text="Scan" />
    </div>
</div>

{#if $scannedNodeData}
    <div class="module">
        <div>
            <div>
                <p>ETH Public Address</p>
            </div>
            <div>
                <p>{$scannedNodeData.address}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Rewards in Data</p>
            </div>
            <div>
                <p>{$scannedNodeData.rewardsInData}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Claim Count</p>
            </div>
            <div>
                <p>{$scannedNodeData.claimCount}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Data Staked</p>
            </div>
            <div>
                <div>
                    <p>{$scannedNodeData.dataStaked}</p>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .scanner {
        display: flex;
        align-items: stretch;
        gap: 10px;
        input {
            flex-grow: 1;
        }
    }
</style>
