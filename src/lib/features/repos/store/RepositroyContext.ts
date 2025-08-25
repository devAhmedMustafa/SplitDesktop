import { get, writable } from "svelte/store";
import RepositoryStore from "./RepositoryStore";

let currentRepository = writable<string | null>(null);

export default class RepositoryContext {
    
    private static instance: RepositoryContext;

    private constructor() {}

    public static getInstance(): RepositoryContext {
        if (!RepositoryContext.instance) {
            RepositoryContext.instance = new RepositoryContext();
        }
        return RepositoryContext.instance;
    }

    public getCurrentRepositoryId() {
        return get(currentRepository);
    }

    public getCurrentRepositoryPath() {
        const repoId = get(currentRepository);
        if (!repoId) {
            throw new Error('No repository selected');
        }

        return RepositoryStore.getInstance().getRepositoryPath(repoId);
    }

    public setRepository(repoId: string | null): void {
        currentRepository.set(repoId);
    }

}