import { PgnGame } from '@mliebelt/pgn-types';
import { PgnReader } from '@mliebelt/pgn-reader';

/**
 * Read a PGN file and return a list of PgnGame objects.
 * TODO: Reading file in PgnReader is not working yet. Correct that, or use instead
 * the code from ../pgn-tools.ts#readFiles
 * @param filename The filename of the PGN file to read
 */
export function readGames(filename: string): PgnGame[] {
    // TODO: Implement reading multiple PgnGame objects from the file
    const reader = new PgnReader({ manyGames: true, pgnFile: filename })
    let resGames: PgnGame[] = [];
    reader.loadMany()
    let count: number = 0
    for (const game of reader.games) {
        reader.loadOne(game)
        resGames.push(reader.getGame(count))
        count++
    }
    return resGames
}
