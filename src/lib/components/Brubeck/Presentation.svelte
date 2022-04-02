<script lang="ts">
    import Consts from "$lib/consts";
    import nodeIllustration from "$lib/assets/streamr/Png/Illustrations/Node.png";
</script>

<section>
    <div class="left">
        <img src={nodeIllustration} alt="A Node illustration" />
    </div>
    <div class="right">
        <div class="pres">
            <div class="text">
                <p>{Consts.wording.PRES_TEXT}</p>
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
    </div>
</section>

<style lang="scss">
    .run {
        font-size: 16px;
    }
    section {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding: 30px;
        .left,
        .right {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 250px;
        }
    }

    p {
        text-align: center;
        line-height: 30px;
        font-size: 26px;
    }

    .pres {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
        padding: 50px;
        font-weight: 800;

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 30px;
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
