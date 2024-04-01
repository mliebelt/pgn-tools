import { describe } from "mocha";
import should = require('should')
import { iterateMoves, iterateParseResult, readFiles } from "../src/pgn-tools"
import { write } from "../src/write"
import {parseGames} from "@mliebelt/pgn-parser"

describe('When writing games to files', () => {
    it('should write a single file if given correct arguments', () => {
        let games = parseGames("1. e4 e5 2. Nf3 *")
        should.equal(games.length, 1)
        let parseResult = new Map()
        parseResult.set('game1.pgn', games)
        write(parseResult, { toFile: true, prefix: 'test-', suffix: '-tmp' })
    })
})