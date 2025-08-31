import EngineAPI from "$lib/core/EngineAPI";
import AuthContext from "$lib/features/auth/AuthContext";
import RepositoryStore from "$lib/features/repos/store/RepositoryStore";
import RepositoryContext from "$lib/features/repos/store/RepositroyContext";
import api from "$lib/utils/apis/api";
import {readFile, writeFile, remove} from "@tauri-apps/plugin-fs";
import type IRemoteRepo from "../IRemoteRepo";

export default class RemoteSync {

    static async clone(repo: IRemoteRepo, directory: string){

        const res = await api.post(`/remote/clone/fetch?repo_url=${repo.url}`, {}, {
            'responseType': 'arraybuffer'
        });

        if(res.status !== 200){
            throw new Error("Failed to clone repository");
        }
        
        const buffer = new Uint8Array(res.data);

        if (buffer.length === 0) {
            throw new Error("Received empty buffer");
        }

        await writeFile(`${directory}/repo.zip`, buffer);

        const repoPath = `${directory.replaceAll(/\\/g, "/")}/${repo.url.split("/").pop()}`;

        await EngineAPI.unzip(repoPath, `${directory}/repo.zip`);
        await remove(`${directory}/repo.zip`);

        const commitHistory = await EngineAPI.getCommitHistory(repoPath);
        if(commitHistory.length > 0){
            await EngineAPI.checkout(repoPath, commitHistory[commitHistory.length - 1]);
        }

        // Save to repository store
        
        const repoStore = RepositoryStore.getInstance();
        if (repoStore.hasRepository(repo.id)){
            throw new Error("Repository already exists");
        }
    
        repoStore.addRepositoryWithId(repo.id, repoPath);

    }

    static async push(){

        // Check authentication

        const authContext = AuthContext.getInstance();
        if(!authContext.isAuthenticated()){
            throw new Error("User is not authenticated");
        }

        // Get current repository

        const repoContext = RepositoryContext.getInstance();
        const repoId = repoContext.getCurrentRepositoryId();
        const repoPath = repoContext.getCurrentRepositoryPath();

        if(!repoId || !repoPath){
            throw new Error("No current repository found");
        }

        // Request for negotiation

        const res = await api.get(`/remote/push/negotiate/${repoId}`);
        if(res.status !== 200){
            throw new Error("Failed to negotiate push");
        }

        const requestedCommitId = res.data.commit_id;

        // Negotiate files to sync

        const filesToSync = await EngineAPI.negotiate(repoPath, requestedCommitId);

        // parse filesToSync from string to list

        const filesToSyncList = filesToSync.split("\n").map(file => file.trim()).filter(file => file !== "");

        // get files from local repo

        const files : File[] = [];
        const filePaths : string[] = [];

        for(const filePath of filesToSyncList){
            const fullPath = `${repoPath}/${filePath}`.replaceAll(/\\/g, "/");
            const fileContent = await readFile(fullPath);
            
            const blob = new Blob([fileContent], {type: "application/octet-stream"});
            const file = new File([blob], filePath.split("/").pop() || "file");
            files.push(file);
            filePaths.push(filePath.replaceAll(/\\/g, "/"));
        }

        // upload files to server

        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        formData.append("repo_id", repoId);
        formData.append("filepathes", JSON.stringify(filePaths));

        const response = await api.post('/remote/push/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": authContext.getToken()
            }
        });

        if (response.status !== 200) {
            throw new Error("Failed to push changes");
        }

    }

}