import { get, writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/core";

const _store = writable<string[]>([]);

export default class RepositoryStore {

    private constructor() {}

    public static getInstance(): RepositoryStore {
        return new RepositoryStore();
    }

    public createRepository(repo: string): void {
        try {
            invoke('scm_init', { repo })
            this.addRepository(repo);
        }
        catch (error) {
            console.error("Failed to create repository:", error);
        }
    }

    public addRepository(repo: string): void {
        _store.update(repos => [...repos, repo]);
        this.save();
    }

    public removeRepository(repo: string): void {
        _store.update(repos => repos.filter(r => r !== repo));
        this.save();
    }

    public listRepositories(): string[] {
        return get(_store);
    }

    private save(): void {
        const repositories = get(_store);
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }

}