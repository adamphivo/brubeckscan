<script lang="ts">
    import { userData } from "$lib/stores/userData";
</script>

<div class="user">
    <!-- <div class="connected">connected</div> -->
    <a href="/">
        <div
            style:background={$userData.profile.gradient}
            class="userGradient"
        />
    </a>
</div>

<style lang="scss">
    .user {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
    }
    .userGradient {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .connected {
        border: thin solid lightgreen;
        color: lightgreen;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        @media (max-width: 500px){
            display: none;
        }
    }
</style>
