<script lang="ts">
    import { userData } from "$lib/stores/user";
</script>

<div class="user">
    <a href="/watchlist">
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
</style>
