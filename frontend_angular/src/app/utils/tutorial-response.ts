import { BlobResponse } from "./blob-response"

export type TutorialResponse = {
    id: number,
    title: string,
    cover: string[],
    contents: string,
    user: number,
    createdAt: Date,
    files: BlobResponse[];
}