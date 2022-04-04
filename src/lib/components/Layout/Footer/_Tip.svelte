<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData } from "$lib/stores/userData";
    import Button from "$lib/components/Elements/Button.svelte";
    import StreamService from "$lib/services/stream";

    async function tip() {
        try {
            await (window as any).ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: $userData.address,
                        to: "0x2BC4019cbA9d02927c9Be04D5cD5D055FC222581",
                    },
                ],
            });

            await StreamService.feedStream.publish("tip", `${Format.shortenNodeAddress($userData.address)} just tipped ! Thank you 🙏`);

        } catch(e){
            throw e;
        }
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
