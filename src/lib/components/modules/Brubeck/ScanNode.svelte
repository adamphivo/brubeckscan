<script lang="ts">
    import { session } from "$app/stores";

    const TEST_ADDRESS_OK = "0xD9925689cb36BfC3E2f82DDaCDa21C231E126EE8";
    const TEST_ADDRESS_KO = "0xD9925689cb36BfC3E2f82DDaCDa21C231E126EE1";

    let inputValue = "";

    async function scan(address: any) {
        const urls = [
            "https://brubeck1.streamr.network:3013/datarewards/",
            "https://brubeck1.streamr.network:3013/stats/",
        ];

        const requests = urls.map(async (url) => {
            return await fetch(`${url}${inputValue}`);
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        if (data) {
            $session.currentNodeData = data;
        }
    }
</script>

<div class="module">
    <div class="scan">
        <input bind:value={inputValue} placeholder="{TEST_ADDRESS_OK}"/>
        <button on:click={scan}>Scan</button>
    </div>
</div>

<style lang="scss">
    .module {
        width: 100%;
    }

    .scan {
        width: 100%;
        display: flex;
        gap: 10px;
    }

    input {
        flex-grow: 1;
    }
</style>
