export type ElementValueObj = {
    value: string,
    element: string
}

export type StaticHtmlProperties = {
    size?: string;
    content: string;
    align?: string;
}

export type MediaHtmlProperties = {
    src: string;
    align?: string;
    width?: string;
    height?: string;
}

export type CustomHtmlWithProps = {
    element: string;
    properties: StaticHtmlProperties | MediaHtmlProperties;
}
