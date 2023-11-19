import { describe } from "mocha";
import should = require('should')
import { sort } from "../src"
import { parseGames } from "@mliebelt/pgn-parser";

describe('When sorting a list of games', () => {
    it('should sort games by date', () => {
        let games = parseGames("e4 * d4 * c4 * b4 * a4 *");
        let res = sort(games)
    })
})