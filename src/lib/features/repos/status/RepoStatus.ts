import RepoStatusStringParser from "./RepoStatusStringParser";

export default class RepoStatus {

    constructor(
        public modifiedFiles: string[],
        public untrackedFiles: string[],
        public deletedFiles: string[]
    ) {}

    get isClean(): boolean {
        return this.modifiedFiles.length === 0 &&
               this.untrackedFiles.length === 0 &&
               this.deletedFiles.length === 0;
    }

    static fromString(status: string): RepoStatus {
        return RepoStatusStringParser.parse(status);
    }
}