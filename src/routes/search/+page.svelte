<script lang="ts">
    import { page } from '$app/stores';
    import UsersSearchResults from '$lib/features/search/UsersSearchResults.svelte';
    import { derived } from 'svelte/store';

    const type = derived(page, $page => $page.url.searchParams.get('type') || '');

</script>

<main>

    {#if $type === 'users'}
        <UsersSearchResults/>
    {:else}
        <h2>Unknown Search Type</h2>
    {/if}

</main>