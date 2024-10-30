import {PgnGame} from '@mliebelt/pgn-types';
import {readMany} from '@mliebelt/pgn-reader';
import { readFiles } from "./pgn-tools";
import fs from "fs";

/**
 * Reads one file synchronous, because used only in the context of some scripts.
 *
 * @param {string} file - The path of the PGN file to be read.
 * @return {PgnGame[]} - An array of PgnGame objects representing the games in the PGN file.
 */
export function readFileSync(file: string): string {
    try {
        return fs.readFileSync(file, 'utf8')
    } catch (err) {
        console.error(`Error while reading file: ${err}`)
        throw err
    }
}
/**
 * Read a PGN file and return a list of PgnGame objects. Reading is done by the reader,
 * not individually. It may be appropriate to have other utility functions, that may
 * handle numerous files / big files more easily. For one file, this is sufficient.
 * @param filename The filename of the PGN file to read
 * @param config ignored
 */
export function readGames(filename: string, config: any = {}): PgnGame[] {
    return readMany(readFileSync(filename))
}
