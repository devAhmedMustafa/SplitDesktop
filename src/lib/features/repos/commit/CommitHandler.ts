import EngineAPI from "$lib/core/EngineAPI";
import AuthContext from "$lib/features/auth/AuthContext";
import RepositoryContext from "../store/RepositroyContext";

export default class CommitHandler {

    private static instance: CommitHandler;

    private filesToStage: string[];

    private constructor() {
        this.filesToStage = [];
    }

    public static getInstance(): CommitHandler {
        if (!this.instance) {
            this.instance = new CommitHandler();
        }
        return this.instance;
    }

    public addFileToStage(filePath: string): void {
        if (!this.filesToStage.includes(filePath)) {
            this.filesToStage.push(filePath);
        }
    }

    public removeFileFromStage(filePath: string): void {
        this.filesToStage = this.filesToStage.filter(f => f !== filePath);
    }

    public triggerCommit(message: string): void {

        if (!message.trim()) {
            throw new Error('Commit message cannot be empty');
        }

        const authContext = AuthContext.getInstance();
        
        if (!authContext.isAuthenticated()) {
            throw new Error('User must be authenticated to commit changes');
        }

        const username = authContext.getUser()?.username;
        if (!username) {
            throw new Error('Authenticated user must have a username');
        }

        const repoContext = RepositoryContext.getInstance();
        const repoPath = repoContext.getCurrentRepositoryPath();

        if (!repoPath) {
            throw new Error('No repository selected');
        }

        EngineAPI.stageFiles(repoPath, this.filesToStage).then(() => {
            console.log('Files staged successfully');

            EngineAPI.commit(repoPath, message, username).then(() => {
                console.log('Commit successful');
            }).catch((error) => {
                console.error('Commit failed:', error);
                throw new Error('Commit failed: ' + error.message);
            });

        }).catch((error) => {
            console.error('Staging files failed:', error);
            throw new Error('Staging files failed: ' + error.message);
        });

    }

}