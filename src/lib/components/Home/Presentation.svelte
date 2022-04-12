<script lang="ts">
</script>

<div class="module">
    <div class="content">
        <div class="text">
            <p>Enhance the Streamr network</p>
            <p class="and">&</p>
            <p>keep track of your rewards</p>
        </div>
    </div>
</div>

<style lang="scss">
    .module {
        width: 50%;
        padding: 0;
        flex-direction: row;
        gap: 0;
        background-position: center;
        background-color: transparent;
        height: calc(100vh - 275px);
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            max-width: 500px;
            .text {
                font-size: 32px;
                text-align: center;
                display: flex;
                flex-direction: column;
                line-height: 52px;
                gap: 30px;
                .and {
                    color: var(--color-orange);
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .module {
            width: 100%;
            height: 500px;
            margin-top: 0;
            .content {
                padding: 10px;
                .text {
                    font-size: 22px;
                }
            }
        }
    }
</style>
