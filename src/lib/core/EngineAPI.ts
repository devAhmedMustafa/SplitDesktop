import { invoke } from "@tauri-apps/api/core";

export default class EngineAPI {

    static getEngineVersion(): string {
        return "1.0.0";
    }

    static async getRepositoryStatus(repoPath: string): Promise<string> {

        const status : string = await invoke("scm_status", { rootPath: repoPath });
        return status;
    }
}