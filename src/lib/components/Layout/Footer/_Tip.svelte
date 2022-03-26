<script lang="ts">
    import { userData } from "$lib/stores/userData";
    import Button from "$lib/components/HTMLElements/Button.svelte";

    async function tip() {
        await (window as any).ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: $userData.address,
                    to: "0x2BC4019cbA9d02927c9Be04D5cD5D055FC222581",
                    value: "0x29a2241af62c0000",
                },
            ],
        });
    }
</script>

<div>
    <Button text="Tip 🥳" action={tip} />
</div>

<style lang="scss">
    div {
        font-size: 16px;
    }
</style>
