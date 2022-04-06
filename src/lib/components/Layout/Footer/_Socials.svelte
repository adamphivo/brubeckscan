<script lang="ts">
    import FaDiscord from "svelte-icons/fa/FaDiscord.svelte";
    import FaGithubSquare from "svelte-icons/fa/FaGithubSquare.svelte";
    import FaTwitterSquare from "svelte-icons/fa/FaTwitterSquare.svelte";
    import FaRedditSquare from "svelte-icons/fa/FaRedditSquare.svelte";
    import FaTrello from "svelte-icons/fa/FaTrello.svelte";
    import FaYoutubeSquare from "svelte-icons/fa/FaYoutubeSquare.svelte";
    import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";
    import FaMediumM from "svelte-icons/fa/FaMediumM.svelte";
</script>

<div class="container">
    <div class="socials">
        <a href="https://github.com/streamr-dev" target="_blank">
            <div class="icon">
                <FaDiscord />
            </div>
        </a>
        <a href="https://discord.gg/gZAm8P7hK8" target="_blank">
            <div class="icon">
                <FaGithubSquare />
            </div>
        </a>
        <a href="https://twitter.com/streamr" target="_blank">
            <div class="icon">
                <FaTwitterSquare />
            </div>
        </a>
        <a href="https://reddit.com/r/streamr" target="_blank">
            <div class="icon">
                <FaRedditSquare />
            </div>
        </a>
        <a href="https://trello.com/b/nQQ9Zwvj/streamr-milestone-2" target="_blank">
            <div class="icon">
                <FaTrello />
            </div>
        </a>
        <a href="https://www.youtube.com/channel/UCGWEA61RueG-9DV53s-ZyJQ" target="_blank">
            <div class="icon">
                <FaYoutubeSquare />
            </div>
        </a>
        <a href="https://www.linkedin.com/company/streamr-network/" target="_blank">
            <div class="icon">
                <FaLinkedin />
            </div>
        </a>
        <a href="https://medium.com/streamrblog" target="_blank">
            <div class="icon">
                <FaMediumM />
            </div>
        </a>
    </div>
</div>

<style lang="scss">
    div {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    
    .socials {
        display: flex;
        gap: 30px;
        .icon {
            width: 25px;
            height: 30px;
            color: lightgray;
            &:hover {
                color: var(--color-orange);
                transition-duration: 0.3s;
            }
        }
        @media (max-width: 1400px) {
            max-width: 100%;
        }
    }
</style>
