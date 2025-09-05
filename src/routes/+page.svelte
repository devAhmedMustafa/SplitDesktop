<script lang="ts">

  import { goto } from "$app/navigation";
  import AuthContext from "$lib/features/auth/AuthContext";
  import RepositoryStore from "$lib/features/repos/store/RepositoryStore";
  import SelectPath from "$lib/utils/ui/SelectPath.svelte";
  import { onMount } from "svelte";
  import Icon from '@iconify/svelte';

  const repoStore = RepositoryStore.getInstance();

  onMount(()=>{
  const authContext = AuthContext.getInstance();

  if (!authContext.isAuthenticated()){
    goto('/auth');
  }

  })

</script>


<div class="split-app-layout">
  <nav class="split-nav">
    <h2>Repositories</h2>
    <div class="split-nav-list">
      {#if repoStore.listRepositories().length > 0}
        <ul>
          {#each repoStore.listRepositoriesIds() as repo}
            <li>
              <a href={`/repo/${repo}`}>{repoStore.getRepositoryPath(repo)}</a>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="split-empty">No repositories</p>
      {/if}
    </div>
  </nav>
  <main class="split-main">
    <div class="split-actions">
      <SelectPath onPathSelected={(path) => { repoStore.createRepository(path); }}>
        <Icon icon="mdi:plus" width="22" height="22" style="vertical-align:middle; color: #fff; background: #7c3aed; border-radius: 50%; padding: 2px;" />
      </SelectPath>
      <SelectPath onPathSelected={(path) => { repoStore.addRepository(path); }}>
        <Icon icon="mdi:folder-outline" width="22" height="22" style="vertical-align:middle; color: #fff; background: #a78bfa; border-radius: 6px; padding: 2px;" />
      </SelectPath>
    </div>
  </main>
</div>

<style>
  :global(body) {
    background: #181a23;
    color: #e6e6f0;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    min-height: 100vh;
  }
  .split-app-layout {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(120deg, #181a23 0%, #2a225a 100%);
  }
  .split-nav {
    width: 250px;
    background: #23243a;
    border-right: 1.5px solid #2d2e4a;
    padding: 2rem 1.2rem 2rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 180px;
  }
  .split-nav h2 {
    color: #b7aaff;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.01em;
  }
  .split-nav-list {
    flex: 1;
    overflow-y: auto;
  }
  .split-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .split-nav li {
    border-radius: 6px;
    transition: background 0.2s;
    padding: 0.4rem 0.7rem;
  }
  .split-nav li:hover {
    background: #2a225a;
  }
  .split-nav a {
    color: #b7aaff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.2s;
    display: block;
    width: 100%;
  }
  .split-nav a:hover {
    color: #e6e6f0;
    text-decoration: underline;
  }
  .split-empty {
    color: #7c7ca6;
    text-align: left;
    font-size: 1rem;
    margin: 1.5rem 0 0 0;
  }
  .split-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .split-actions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    background: #23243a;
    padding: 2.5rem 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 rgba(80, 60, 180, 0.10);
    min-width: 320px;
    max-width: 400px;
  }
  .split-actions :global(button) {
    width: 100%;
    padding: 0.85rem 1.2rem;
    background: #7c3aed;
    color: #fff;
    font-size: 1.08rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    box-shadow: 0 2px 8px 0 rgba(80, 60, 180, 0.10);
    outline: none;
  }
  .split-actions :global(button:hover) {
    background: #a78bfa;
    color: #e6e6f0;
  }
</style>
