export default function isGithubRepoPage(url: string): boolean {
    const regex: RegExp = /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/;
    return regex.test(url);
}
