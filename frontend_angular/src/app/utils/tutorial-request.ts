export type TutorialRequest = {
    title: string,
    cover: File,
    contents: string,
    files: File[] | null;
}