<script lang="ts">
    import { session } from "$app/stores";
    import { goto } from "$app/navigation";
    import api from "$lib/api";

    let name = "";
    let color = "#3465a4";

    async function validate() {}

    async function submit() {
        const userAddress = $session.user.address;

        const update = {
            nodelists: {
                create: {
                    name: name,
                    color: color,
                },
            },
        };

        const save = await api.syncUser(userAddress, update);

        if (save) {
            goto("/lists");
        }
    }
</script>

<div class="module">
    <form on:submit|preventDefault={submit}>
        <div class="item">
            <label for="color">Color ?</label>
            <input id="color" type="color" class="color" bind:value={color} />
        </div>
        <div class="item">
            <label for="name">List name</label>
            <input id="name" type="text" bind:value={name} default={true} placeholder="list name"/>
        </div>
        <div class="item">
            <label for="submit">Save</label>
            <button id="submit" type="submit">Save</button>
        </div>
    </form>
</div>

<style lang="scss">
    .module {
        width: 100%;
    }

    .color {
        width: 50px;
        height: 30px;
        border: 1px solid lightgray;
        box-shadow: none;
        padding: 0;
    }

    .item {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    input {
        padding: 20px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        label {
            font-size: 12px;
            display: none;
        }
    }
</style>
