<script lang="ts">
  import { goto } from "$app/navigation";
  import AuthContext from "$lib/features/auth/AuthContext";
  import RepositoryStore from "$lib/features/repos/RepositoryStore";
  import SelectPath from "$lib/utils/ui/SelectPath.svelte";
  import { onMount } from "svelte";

  const repoStore = RepositoryStore.getInstance();

  onMount(()=>{
  const authContext = AuthContext.getInstance();

  if (!authContext.isAuthenticated()){
    goto('/auth');
  }

  })

</script>

<main class="container">

  {#if repoStore.listRepositories().length > 0}
  <h1>Repositories</h1>
  <ul>
    {#each repoStore.listRepositories() as repo}
      <li>{repo}</li>
    {/each}
  </ul>
  {:else}
  <p>No repositories found.</p>
  {/if}

  <SelectPath onPathSelected={(path) => {
    repoStore.createRepository(path);
  }}>
    Create Repository
  </SelectPath>

  <SelectPath onPathSelected={(path) => {
    repoStore.addRepository(path);
  }}>
    Select Repository Root
  </SelectPath>

</main>
