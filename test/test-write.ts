import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { iterateMoves, iterateParseResult, readFiles } from '../src/pgn-tools';
import { write } from '../src/write';
import { parseGames } from '@mliebelt/pgn-parser';

const writingGamesSuite = suite('When writing games to files');

writingGamesSuite('should write a single file if given correct arguments', () => {
    let games = parseGames("1. e4 e5 2. Nf3 *");
    assert.is(games.length, 1);
    let parseResult = new Map();
    parseResult.set('game1.pgn', games);
    write(parseResult, { toFile: true, prefix: 'test-', suffix: '-tmp' });
});

writingGamesSuite.run();