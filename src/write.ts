import {ParseResult, WriteOptions} from "./types";
import {iterateParseResult} from "./pgn-tools";
import {ParseTree} from "@mliebelt/pgn-parser";
import { writeGame } from "@mliebelt/pgn-writer"
import { writeFileSync } from 'fs'

/**
 * Writes a list of games to a PGN file. If the games are not mapped to files, use as standard name for the file `pgn-file.pgn`.
 * @param games
 * @param options - options for writing the games.
 *   - `toFile` - if true, writes to a file. If false, returns the PGN as a string. Default is true.
 *   @returns PGN as string if `toFile` is false, otherwise undefined.
 */
export function write(games: ParseResult, options: WriteOptions = {toFile: true}) : void {
    if (options.toFile){
        if (Array.isArray(games)) {
            console.error("You have to map games to files if you want to write them to a file. Aborting.")
            return
        }
    }

    // @ts-ignore
    iterateParseResult(games, (game: ParseTree, file: string) => {
        writeSingleGame(game, file)
        return game
    })
}

/**
 * Writes a single game, returns the string
 * @param game - single game to write
 * @returns PGN as string
 */
function writeSingleGame(game: ParseTree, file: string): void {
    console.log(JSON.stringify(game, null, 2))
    const pgnString = writeGame(game as ParseTree)
    writeFileSync(file, pgnString);
}

