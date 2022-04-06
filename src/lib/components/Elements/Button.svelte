<script lang="ts">
    export let action;
    export let text = "Button";
    export let size = "16px";

    let status = "";

    async function wrap() {
        if (!status) {
            status = "Pending";
            try {
                await action();
                status = "Done";
            } catch (e) {
                status = "Error";
            } finally {
                setTimeout(() => {
                    status = "";
                }, 1000);
            }
        } else {
            return;
        }
    }
</script>

<button on:click|preventDefault={wrap} class={status} style:font-size={size}>
    <span>{text}</span>
</button>

<style lang="scss">
    button {
        font-weight: 800;
        font-size: 14px;
        &.Pending {
            color: orange;
            border-color: orange;
            user-select: none;
            cursor: wait;
            &:hover {
                background-color: transparent;
                cursor: wait;
            }
        }
        &.Done {
            color: green;
            border-color: green;
            &:hover {
                background-color: transparent;
            }
        }
        &.Error {
            color: red;
            border-color: red;
            &:hover {
                background-color: transparent;
            }
        }
    }
</style>
