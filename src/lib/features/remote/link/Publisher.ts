import AuthContext from "$lib/features/auth/AuthContext";
import RepositoryStore from "$lib/features/repos/store/RepositoryStore";
import api from "$lib/utils/apis/api";

export default class Publisher {

    private constructor() {}

    static async isPublished(repoId: string): Promise<boolean> {
        const res = await api.get(`remote/${repoId}`);
        return res.data.is_active;
    }

    static async publish(repoId: string) : Promise<string | null> {
        
        // Check if authenticated

        const authContext = AuthContext.getInstance();
        if (!authContext.isAuthenticated()) {
            throw new Error("User not authenticated");
        }

        const token = authContext.getToken();

        // Get repository from RepositoryStore

        const repositoryStore = RepositoryStore.getInstance();
        const repositoryPath = repositoryStore.getRepositoryPath(repoId);
        if (!repositoryPath) {
            throw new Error("Repository not found");
        }
        
        // Extract folder name from repoPath

        const folderName = repositoryPath.split("\\").pop()?.replace(".split", "");


        // Call API to publish the repository
        const res = await api.post("remote/link", {
            repo_name: folderName,
            token,
        });

        console.log(res.data);

        if (!res.data.id) {
            throw new Error("Failed to publish repository");
        }

        // Update the repoId in RepositoryStore

        const newRepoId = res.data.id;
        repositoryStore.updateRepoId(repoId, newRepoId);
        console.log("Repository published successfully", res.data);


        return newRepoId;
    }

}