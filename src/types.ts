import {ParseTree} from "@mliebelt/pgn-parser";

export type StripOptions = {
    nocomments?: boolean,
    nonags?: boolean,
    illegalMoves?: boolean,
    illegalNags?: boolean,
    illegalComments?: boolean,
    noannotations?: boolean,
    moveNumbers?: boolean,
    notags?: string[],
    novariants?: boolean,
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

export type WriteOptions = {
    prefix?: string,
    suffix?: string,
    toFile?: boolean
}

export type ParseResult = ParseTree[] | MappedParseTrees
export type MappedParseTrees = Map<string,ParseTree[]>