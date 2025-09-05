<script lang="ts">
    import Icon from '@iconify/svelte';
    import { goto } from "$app/navigation";
    import RepositoryContext from "$lib/features/repos/store/RepositroyContext";
    import Publisher from "./Publisher";


    const repoContext = RepositoryContext.getInstance();    

    async function handlePublish() {

        if (!repoContext.getCurrentRepositoryId()) {
            throw new Error("No repository selected");
        }

        try {
            const newId = await Publisher.publish(repoContext.getCurrentRepositoryId()!);
            if (newId == null) {
                throw new Error("Failed to publish repository");
            }

            goto(`/repo/${newId}`);
        } catch (error) {
            console.error("Failed to publish repository:", error);
        }

    }

</script>

<button class="repo-action-btn" on:click={handlePublish}>
    <Icon icon="mdi:cloud-upload-outline" width="20" height="20" style="vertical-align:middle;margin-right:0.5em;" />
    Publish
</button>

<style>
    .repo-action-btn {
        background: #7c3aed;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        padding: 0.7rem 1.3rem;
        transition: background 0.2s, color 0.2s;
        box-shadow: 0 2px 8px 0 rgba(80, 60, 180, 0.10);
        outline: none;
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .repo-action-btn:hover {
        background: #a78bfa;
        color: #e6e6f0;
    }
</style>