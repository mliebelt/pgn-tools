/* Dummy file */
import {PgnGame} from "@mliebelt/pgn-types";
import {ParseTree} from "@mliebelt/pgn-parser"
import {ReadOptions, SortOptions, StripOptions} from "./types"
import fs from "fs"
import path from "path"

/**
 * Reads PGN files and returns the input without parsing it. There are 2 ways to read files:
 * 1. Read files and return an array of input strings. options.mapInput must be false. This is the default.
 * 2. Read files and return a map of file names to input strings.
 *
 * If there are no files given, the input will be taken from stdin.
 *
 * @param files - Array of file paths to read.
 * @returns Array of input strings or map of file names to input strings.
 */
export function readFiles(files: string[], options: ReadOptions = { mapInput: false }): string[] | Map<string, string> {
    if (files.length === 0) { // no files given, read from stdin
        const fileContent = fs
            .readFileSync(0)
            .toString()
            .trim();
        if (options.mapInput) {
            const map: Map<string, string> = new Map();
            map.set('STDIN', fileContent);
            return map
        } else {
            return [fileContent]
        }
    }
    let resultArray: string[] = []
    let resultMap: Map<string, string> = new Map();
    for (const file of files) {
        const fileContent = fs
            .readFileSync(path.resolve(file))
            .toString()
            .trim();
        if (options.mapInput) {
            resultMap.set(file, fileContent);
        } else {
            resultArray.push(fileContent);
        }
    }
    return options.mapInput ? resultMap : resultArray;
}

/**
 * Sorts an array of PGN parse trees.
 *
 * @param games - Array of PgnParseTree objects to sort.
 * @returns Sorted array of PgnParseTree objects.
 */
export function sort(games: ParseTree[], options: SortOptions = {orderAscending: true}) {
    // TODO: implement sorting logic
    return [];
}

/**
 * Strips metadata from PGN games according to options.
 *
 * @param games - Array of PgnParseTree objects to strip metadata from.
 * @param options - Options for what metadata to strip. Default is to strip all but mainline.
 * @returns Array of stripped PgnParseTree objects.
 */
export function strip(games: ParseTree[], options: StripOptions = {all: true}) {
    // TODO: implement stripping logic
    return [];
}
