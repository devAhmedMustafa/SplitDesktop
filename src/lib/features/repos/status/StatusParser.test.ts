import RepoStatus from "./RepoStatus";
import RepoStatusStringParser from "./RepoStatusStringParser";

test("RepoStatusStringParser parses clean status", () => {
    const status = "Clean";
    const result = RepoStatusStringParser.parse(status);
    expect(result).toEqual(new RepoStatus([], [], []));
});

test("RepoStatusStringParser parses modified files", () => {
    const status = "file1.txt:Modified\nfile2.txt:Modified";
    const result = RepoStatusStringParser.parse(status);
    expect(result).toEqual(new RepoStatus(["file1.txt", "file2.txt"], [], []));
});

test("RepoStatusStringParser parses untracked files", () => {
    const status = "file3.txt:Untracked\nfile4.txt:Untracked";
    const result = RepoStatusStringParser.parse(status);
    expect(result).toEqual(new RepoStatus([], ["file3.txt", "file4.txt"], []));
});

test("RepoStatusStringParser parses deleted files", () => {
    const status = "file5.txt:Deleted\nfile6.txt:Deleted";
    const result = RepoStatusStringParser.parse(status);
    expect(result).toEqual(new RepoStatus([], [], ["file5.txt", "file6.txt"]));
});