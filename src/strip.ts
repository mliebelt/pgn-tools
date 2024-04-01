import {ParseResult, StripOptions} from "./types";
import {iterateParseResult} from "./pgn-tools";
import {ParseTree} from "@mliebelt/pgn-parser";

/**
 * Strips metadata from PGN games according to options. Acts depending on the games parameter type.
 *
 * @param games - Array of PgnParseTree objects to strip metadata from, or Map of file names to PgnParseTree objects.
 * @param options - Options for what metadata to strip. Default is to strip all but mainline.
 * @returns Array of stripped PgnParseTree objects.
 */
export function strip(games: ParseResult, options: StripOptions = {all: true}) : ParseResult {
    const comments = options.nocomments?? options.noannotations?? options.all
    const nags = options.nonags?? options.noannotations?? options.all
    const moveNumbers = options.moveNumbers
    const variation = options.novariants?? options.all

    let tmp : ParseResult = games

    function stripVariation(games: ParseResult) : ParseResult {
        return iterateParseResult(games, (game: ParseTree) => {
            let tmp = structuredClone(game)
            for (const move of tmp.moves) {
                move.variations = []
            }
            return tmp
        })
    }

    function stripComments(games: ParseResult) : ParseResult {
        return iterateParseResult(games,
            (game: ParseTree) => {
                let tmp = structuredClone(game)
                for (let move of tmp.moves) {
                    move.commentDiag = {}
                    move.commentMove = undefined
                    move.commentAfter = undefined
                }
                return tmp
            })
    }

    if (variation) {
        tmp = stripVariation(tmp)
    }
    if (comments) {
        tmp = stripComments(tmp)
    }

    return tmp;
}
