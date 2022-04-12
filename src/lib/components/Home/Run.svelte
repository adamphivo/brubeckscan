<script lang="ts">
    import nodeLogsImage from "$lib/assets/streamr/Png/Illustrations/Node.png";
</script>

<div class="module">
    <img src={nodeLogsImage} alt="test" />
    <a
        href="https://streamr.network/docs/streamr-network/installing-broker-node"
        target="_blank"
    >
        <button>
            <span>Run a node ⚡</span>
        </button>
    </a>
</div>

<style lang="scss">
    button {
        padding-left: 20px;
        padding-right: 20px;
    }
    .module {
        margin-top: 50px;
        flex-grow: 1;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 100px;
        img {
            width: 200px;
        }

        a button span {
            font-size: 20px;
        }
    }

    @media (max-width: 1200px) {
        .module {
            width: 100%;
            margin-top: 0;
        }
    }
</style>
