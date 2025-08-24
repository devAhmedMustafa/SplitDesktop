import RepoStatus from "./RepoStatus";

export default class RepoStatusStringParser {
    static parse(status: string): RepoStatus {

        if (status === "Clean") {
            return new RepoStatus([], [], []);
        }

        const lines = status.split('\n').filter(line => line.trim() !== '');
        
        const modifiedFiles: string[] = [];
        const untrackedFiles: string[] = [];
        const deletedFiles: string[] = [];

        for (const line of lines) {
            const [file, status] = line.split(':');
            switch (status.trim().toLowerCase()) {
                case 'modified':
                    modifiedFiles.push(file.trim());
                    break;
                case 'untracked':
                    untrackedFiles.push(file.trim());
                    break;
                case 'deleted':
                    deletedFiles.push(file.trim());
                    break;
            }
        }

        return new RepoStatus(modifiedFiles, untrackedFiles, deletedFiles);
    }

}