/* Dummy file */
import {PgnMove} from "@mliebelt/pgn-types";
import {ParseTree} from "@mliebelt/pgn-parser"
import {MappedParseTrees, ParseResult, ReadOptions, SortOptions, StripOptions} from "./types"
import fs from "fs"
import path from "path"
import { createWriteStream } from "fs"
import { format } from "date-fns"

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
    function handleReadException(e, stdin: string, errorHandling: "warn" | "log" | "silent" | undefined) {
        if (errorHandling === "silent") {
            return
        }
        if (errorHandling === "warn") {
            console.warn(e.message)
            return
        }
        if (errorHandling === "log") {
            const logStream = createWriteStream('./read.log')
            const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            const message = `${timestamp} ERROR: ${e.message}`;
            logStream.write(`${message}\n`)
            return
        }
        throw e
    }

    if (files.length === 0) { // no files given, read from stdin
        let fileContent
        try {
            fileContent = fs
                .readFileSync(0)
                .toString()
                .trim();
        } catch (e) {
            handleReadException(e, "STDIN", options.errorHandling)
        }
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
        let fileContent
        try {
            fileContent = fs
                .readFileSync(path.resolve(file))
                .toString()
                .trim();
        } catch (e) {
            handleReadException(e, file, options.errorHandling)
        }
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
 * Iterate over a ParseResult and apply a callback to each game. This looping mechanism ensures, that the logic done inside (working on a game) is independent of the type of the games parameter.
 * @param games - Array of PgnParseTree objects, or Map of file names to PgnParseTree objects.
 * @param callback - Callback to apply to each game. Has as only argument the ParseTree, and returns all the time the ParseTree.
 */
export function iterateParseResult(games: ParseResult, callback: (game: ParseTree, file?: string) => ParseTree) {
    if (Array.isArray(games)) {
        let tmp : ParseTree[] = []
        for (const game of games) {
            tmp.push(callback(game))
        }
        return tmp
    } else {
        let tmp : MappedParseTrees = new Map()
        for (const file of games.keys()) {
            const mts = games.get(file)
            let tmppt : ParseTree[] = []
            // @ts-ignore
            for (const game of games.get(file)) {
                tmppt.push(callback(game, file))
            }
            tmp.set(file, tmppt)
        }
        return tmp
    }
}

/** Iterate recursively over moves, ensure that for each move
 *  1. the callback is called
 *  2. for all moves in variations the callback is called
 *  3. and the recursive call is done then
 *
 * @param game - the game for which all moves have to be iterated
 * @param callback - the callback to call with one argument, the move given
 */
export function iterateMoves(game: ParseTree, callback: (move: PgnMove) => void) {
    function iterateVariations(move2: PgnMove) {
        callback(move2)
        for (let variation of move2.variations) {
            for (let vMove of variation) {
                iterateVariations(vMove)
            }
        }
    }
    for (let move of game.moves) {
        iterateVariations(move)
    }
}