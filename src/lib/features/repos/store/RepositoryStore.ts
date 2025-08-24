import { get, writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/core";
import { hashString } from "$lib/utils/cipher/Hash";


const _store = writable<{ [key: string]: string }>(
    localStorage.getItem('repositories') ? 
    JSON.parse(localStorage.getItem('repositories')!) : {}
);

export default class RepositoryStore {

    private static instance: RepositoryStore | null = null;

    private constructor() {}

    public static getInstance(): RepositoryStore {
        if (!this.instance) {
            this.instance = new RepositoryStore();
        }
        return this.instance;
    }


    public async createRepository(repo: string): Promise<void> {
        try {
            await invoke('scm_init', { rootPath: repo });
            await this.addRepository(repo);
        } catch (error) {
            console.error("Failed to create repository:", error);
        }
    }

    public async addRepository(repoPath: string): Promise<void> {
        const repoId = await hashString(repoPath);
        _store.update(repos => {
            repos[repoId] = repoPath;
            return repos;
        });
        this.save();
    }

    public removeRepository(repoId: string): void {
        _store.update(repos => {
            delete repos[repoId];
            return repos;
        });
        this.save();
    }

    public getRepositoryPath(repoId: string): string | undefined {
        return get(_store)[repoId];
    }

    public listRepositoriesIds(): string[] {
        return Object.keys(get(_store));
    }

    public listRepositories(): string[] {
        return Object.values(get(_store));
    }

    private save(): void {
        const repositories = get(_store);
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }

}