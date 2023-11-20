export type StripOptions = {
    comments?: boolean,
    nags?: boolean,
    illegalMoves?: boolean,
    illegalNags?: boolean,
    illegalComments?: boolean,
    annotations?: boolean,
    moveNumbers?: boolean,
    tagPairs?: string[],
    timeControls?: boolean,
    gameTermination?: boolean,
    variation?: boolean,
    all?: boolean
}

export type SortOptions = {
    sortTags?: string[],
    sortByEcoCode?: boolean,
    orderAscending?: boolean
}

export type ReadOptions = {
    mapInput?: boolean
    errorHandling?: "warn" | "log" | "silent"
}