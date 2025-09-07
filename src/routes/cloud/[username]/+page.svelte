<script lang="ts">
    import type IRemoteRepo from "$lib/features/remote/IRemoteRepo";
    import UserProfile from "$lib/features/userProfile/UserProfile";
    import { onMount } from "svelte";


    export let params: { username: string };

    let userRepos : IRemoteRepo[] = [];

    onMount(async ()=>{
        const userProfile = new UserProfile();
        await userProfile.reloadUser(params.username);
        const repos = await userProfile.getUserRepositories();

        userRepos = repos;
    })

</script>

<main class="cloud-user-main">
    <h1 class="cloud-user-header">User: {params.username}</h1>

    {#if userRepos.length > 0}
        <ul class="cloud-user-repos">
            {#each userRepos as repo}
                <li class="cloud-user-repo-item">
                    <a href={`${params.username}/${repo.name}`}>{repo.name}</a>
                    <p class="cloud-user-repo-description">Description</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No repositories found for this user.</p>
    {/if}
</main>
