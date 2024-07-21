export interface Project {
    uid: string,
    name: string,
    articleNumber: number,
    lastUpdate: string,
}

export interface Article {
    uid: string,
    name: string,
    relations: string[],
    filePath?: string,
}