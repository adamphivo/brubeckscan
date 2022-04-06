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
        height: calc(100vh - 325px);
        margin-top: 50px;
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            .text {
                font-size: 30px;
                text-align: center;
                display: flex;
                flex-direction: column;
                font-weight: 900;
                line-height: 32px;
                gap: 60px;
                .and {
                    color: var(--color-orange);
                }
            }
        }
    }
</style>
