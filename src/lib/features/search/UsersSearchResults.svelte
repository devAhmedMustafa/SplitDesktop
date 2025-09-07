<script lang="ts">
    import {page} from '$app/stores';
    import {derived, get} from 'svelte/store';
    import { onMount } from "svelte";
    import type IUser from "../auth/IUser";
    import Search from "./Search";

    const query = derived(page, $page => $page.url.searchParams.get('q') || '');

    let users = $state<IUser[]>();

    onMount(()=>{

        Search.userSearch(get(query)).then(res=>{
            users = res;
            console.log(users);
        });

    })

</script>

{#if users && users.length > 0}
    <h2>Users</h2>
    <ul class="search-results-list">
        {#each users as user}
            <li class="search-result-item">
                <div class="user-info">
                    <div class="user-details">
                        <strong>{user.username}</strong>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
{:else if users && users.length === 0}
    <p>No users found for "{get(query)}".</p>
{:else}
    <p>Loading...</p>
{/if}

