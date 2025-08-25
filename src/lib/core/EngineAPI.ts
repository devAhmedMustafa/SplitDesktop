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
}