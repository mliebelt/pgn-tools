import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { iterateMoves, iterateParseResult } from '../src/pgn-tools';
import { parseGames } from '@mliebelt/pgn-parser';

const iteratingGamesSuite = suite('When iterating a list of games');

iteratingGamesSuite('should be able to iterate over all moves in each game', () => {
    let games = parseGames("e4 e5 Nf3 * d4 (c4) d5 *");
    let res: string = '';
    iterateParseResult(games, (game) => {
        iterateMoves(game, (move) => {
            res += move.notation.notation;
        });
        res += game.tags?.Result;
        return game;
    });
    assert.is(res, "e4e5Nf3*d4c4d5*");
});

iteratingGamesSuite.run();