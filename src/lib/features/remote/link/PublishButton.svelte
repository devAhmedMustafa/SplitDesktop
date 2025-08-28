<script lang="ts">
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

<button on:click={handlePublish}>
    Publish
</button>