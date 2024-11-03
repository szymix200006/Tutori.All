import { TutorialCategory } from "./tutorial-category";

export interface TutorialIcon {
    id: number;
    imageSrc: string;
    title: string;
    author: string;
    category: TutorialCategory | '';
}
