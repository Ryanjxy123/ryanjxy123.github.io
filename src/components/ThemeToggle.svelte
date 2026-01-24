<script>
    import { onMount } from "svelte";
    let isDark = false;

    onMount(() => {
        // 初始化：检查 localStorage 或 系统偏好
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            isDark = true;
            document.documentElement.classList.add("dark");
        } else {
            isDark = false;
            document.documentElement.classList.remove("dark");
        }
    });

    function toggleTheme() {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }
</script>

<button
    on:click={toggleTheme}
    class="p-2 transition-transform active:scale-95 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
    aria-label="Toggle Theme"
>
    {#if isDark}
        <div class="text-blue-300 text-xl">🌙</div>
    {:else}
        <div class="text-orange-500 text-xl">☀️</div>
    {/if}
</button>
