<script lang="ts">
</script>

<div class="pres module">
    <div class="text">
        <p>Enhance the Streamr network</p>
        <p class="and">&</p>
        <p class="textToken">keep track of your rewards</p>
    </div>
    <a
        href="https://streamr.network/docs/streamr-network/installing-broker-node"
        target="_blank"
    >
        <button>
            <span class="run">Run a node</span>
        </button>
    </a>
</div>

<style lang="scss">
    .module {
        width: 100%;
        padding: 0;
        flex-direction: row;
        gap: 0;
        padding: 100px 50px;
        background-color: transparent;
    }
    .run {
        font-size: 16px;
    }

    p {
        text-align: center;
        line-height: 30px;
        font-size: 26px;
    }

    a {
        text-decoration: none;
    }

    button {
        font-weight: 600;
        font-size: 22px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    .pres {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 100px;
        padding: 100px 50px;
        font-weight: 800;
        width: 100%;
        // background-color: rgba(0, 0, 0, 0.452);

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 50px;
        }

        .textToken {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }

        .and {
            color: var(--color-orange);
        }
    }
</style>
