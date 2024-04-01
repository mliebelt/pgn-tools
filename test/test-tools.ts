import { describe } from "mocha";
import should = require('should')
import { iterateMoves, iterateParseResult } from "../src/pgn-tools"
import {parseGames} from "@mliebelt/pgn-parser"

describe('When iterating a list of games', () => {
    it('should be able to iterate over all moves in each game', () => {
        let games = parseGames("e4 e5 Nf3 * d4 (c4) d5 *")
        let res: string = ''
        iterateParseResult(games, (game) => {
            iterateMoves(game, (move) => {
                res += move.notation.notation
            })
            res += game.tags?.Result
            return game
        })
        should.equal(res, "e4e5Nf3*d4c4d5*")
    })
})