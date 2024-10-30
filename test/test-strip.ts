import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { strip } from '../src';
import { parseGames, ParseTree } from '@mliebelt/pgn-parser';
import { ParseResult, StripOptions } from '../src';
import { MappedParseTrees } from '../lib/mjs/types';

const parseStrip = function (content: string, options?: StripOptions): ParseResult {
    let games = parseGames(content);
    return strip(games, options);
};

const strippingVariantsSuite = suite('When stripping all variants in a list of games');

strippingVariantsSuite('should remove all variants in the games without option given (== all)', () => {
    let games = parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *");
    let res = strip(games);
    assert.is(res[0].moves[0].variations.length, 0);
});

strippingVariantsSuite('should remove all variants in the games with option novariants', () => {
    let games = parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *");
    let res = strip(games, { novariants: true });
    assert.is(res[0].moves[0].variations.length, 0);
});

strippingVariantsSuite.run();

const strippingCommentsSuite = suite('When stripping all comments in a list of games');

strippingCommentsSuite('should remove all comments in all moves with option == all', () => {
    let games = parseGames("1. e4 { c1} e5 {c2} (2... d5 {c3})");
    let res = strip(games);
    assert.ok(res);
});

strippingCommentsSuite.run();

const strippingMappedWaySuite = suite('When stripping a list of games the mapped way');

strippingMappedWaySuite('should have the file name available in the result structure then', () => {
    let games: MappedParseTrees = new Map<string, ParseTree[]>();
    games.set("test.pgn", parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *"));
    let res: MappedParseTrees = strip(games) as MappedParseTrees;
    assert.ok(res.get("test.pgn"));
    assert.is(res.get("test.pgn")![0].moves[0].variations.length, 0);
});

strippingMappedWaySuite.run();