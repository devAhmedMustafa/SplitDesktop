<script lang="ts">
    import type IRemoteRepo from "$lib/features/remote/IRemoteRepo";
    import CloneButton from "$lib/features/remote/sync/CloneButton.svelte";
    import api from "$lib/utils/apis/api";
    import { onMount } from "svelte";


    export let params: { username: string; reponame: string };
    
    let repo : IRemoteRepo | null = null;

    onMount(async ()=>{
        const { username, reponame } = params;
        const res = await api.get(`/remote/${username}/${reponame}`);
        repo = res.data;
    })

</script>

<main>

    <h1 class="text-3xl font-bold underline">Repository: {params.reponame}</h1>

    {#if repo}
        <p class="mt-4">Owner: {params.username}</p>
        <CloneButton {repo} />
    {:else}
        <p class="mt-4">Loading repository details...</p>
    {/if}
    

</main>