<script lang="ts">
    import {page} from '$app/stores';
    import {derived, get} from 'svelte/store';
    import { onMount } from "svelte";
    import type IUser from "../auth/IUser";
    import Search from "./Search";
    import { goto } from '$app/navigation';

    const query = derived(page, $page => $page.url.searchParams.get('q') || '');

    let users = $state<IUser[]>();

    onMount(()=>{

        Search.userSearch(get(query)).then(res=>{
            users = res;
            console.log(users);
        });

    })

    function handleNavigateToUser(username: string){
        goto(`/cloud/${username}`);
    }

</script>

{#if users && users.length > 0}
    <h2>Users</h2>
    <ul class="search-results-list">
        {#each users as user}
            <li class="search-result-item">
                <!-- svelte-ignore event_directive_deprecated -->
                <button on:click={() => handleNavigateToUser(user.username)}>

                    <div class="user-info">
                        <div class="user-details">
                            <strong>{user.username}</strong>
                        </div>
                    </div>

                </button>
            </li>
        {/each}
    </ul>
{:else if users && users.length === 0}
    <p>No users found for "{get(query)}".</p>
{:else}
    <p>Loading...</p>
{/if}

<style>
    .search-results-list {
        list-style: none;
        padding: 0;
    }

    .search-result-item {
        margin-bottom: 1em;
    }

    .search-result-item button {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .search-result-item button:hover {
        background-color: #f0f0f0;
    }

    .user-info {
        display: flex;
        align-items: center;
    }

    .user-details {
        margin-left: 1em;
    }
    .user-details strong {
        font-size: 1.1em;
    }
</style>
