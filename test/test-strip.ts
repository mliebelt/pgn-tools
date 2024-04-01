import { describe } from "mocha";
import should = require('should')
import { strip } from "../src"
import {parseGames, ParseTree} from "@mliebelt/pgn-parser"
import {ParseResult, StripOptions} from "../src";
import {MappedParseTrees} from "../lib/mjs/types";

const parseStrip = function (content: string, options?: StripOptions): ParseResult {
    let games = parseGames(content)
    return strip(games, options)
}

describe('When stripping all variants in a list of games', () => {
    it('should remove all variants in the games without option given (== all)', () => {
        let games = parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *")
        let res = strip(games)
        should.equal(res[0].moves[0].variations.length, 0)
    })
    it('should remove all variants in the games with option novariants', () => {
        let games = parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *")
        let res = strip(games, {novariants: true})
        //console.log(JSON.stringify(res, null, 2))
        should.equal(res[0].moves[0].variations.length, 0)
    })
})

describe('When stripping all comments in a list of games', () => {
    it('should remove all comments in all moves with option == all', () => {
        let games = parseGames("1. e4 { c1} e5 {c2} (2... d5 {c3})")
        let res = strip(games)
        should.exist(res)
    })
})

describe('When stripping a list of games the mapped way', () => {
    it('should have the file name available in the result structure then', () => {
        let games: MappedParseTrees = new Map<string, ParseTree[]>()
        games.set("test.pgn", parseGames("1. e4 { Test } (d4) (c4) * 2. d4 * 3. c4 * 4. b4 *"))
        let res: MappedParseTrees = strip(games) as MappedParseTrees
        should.exist(res.get("test.pgn"))
        // @ts-ignore
        should.equal(res.get("test.pgn")[0].moves[0].variations.length, 0)
    })
})

