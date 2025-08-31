import { invoke } from "@tauri-apps/api/core";

export default class EngineAPI {

    static getEngineVersion(): string {
        return "1.0.0";
    }

    static async getRepositoryStatus(repoPath: string): Promise<string> {

        const status : string = await invoke("scm_status", { rootPath: repoPath });
        return status;
    }

    static async stageFile(repoPath: string, filePath: string): Promise<void> {
        await invoke("scm_add", { rootPath: repoPath, filePath: filePath });
    }

    static async stageFiles(repoPath: string, filePaths: string[]): Promise<void> {
        for (const filePath of filePaths) {
            await this.stageFile(repoPath, filePath);
        }
    }

    static async commit(repoPath: string, message: string, author: string): Promise<void> {
        await invoke("scm_commit", { rootPath: repoPath, message: message, author: author });
    }

    static async getCommitHistory(repoPath: string): Promise<string[]> {
        const historyStr: string = await invoke("scm_history", { rootPath: repoPath });
        const history: string[] = historyStr.split("\n").filter(line => line.trim() !== "");
        return history;
    }

    static async checkout(repoPath: string, commitId: string): Promise<void> {
        await invoke("scm_checkout", { rootPath: repoPath, commitId: commitId });
    }

    static async negotiate(repoPath: string, requestedCommitId: string): Promise<string> {
        const response: string = await invoke("scm_negotiate", { rootPath: repoPath, requestedCommitId: requestedCommitId });
        return response;
    }

    static async unzip(repoPath: string, zipFilePath: string): Promise<void> {
        await invoke("unzip_repo", { zipPath: zipFilePath, extractTo: repoPath });
    }
}