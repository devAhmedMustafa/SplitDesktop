import { get, writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/core";

const _store = writable<string[]>(JSON.parse(localStorage.getItem('repositories') || '[]'));

export default class RepositoryStore {

    private static instance: RepositoryStore | null = null;

    private constructor() {}

    public static getInstance(): RepositoryStore {
        if (!this.instance) {
            this.instance = new RepositoryStore();
        }
        return this.instance;
    }

    public createRepository(repo: string): void {
        try {
            invoke('scm_init', { rootPath: repo }).then(() => {
                this.addRepository(repo);
            });
        } catch (error) {
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