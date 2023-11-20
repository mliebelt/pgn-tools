import {beforeEach, describe} from "mocha";
import should = require('should')
import {readFiles, sort} from "../src"
import { parseGames } from "@mliebelt/pgn-parser"
import {unlink, unlinkSync} from 'fs'
import path = require('path')

describe('When using readFiles with no map for file names', () => {
    let stdin

    beforeEach( () => { stdin = require('mock-stdin').stdin() } )

    xit('reads from stdin when no files are given', async () => {
        const input = 'input data';
        process.nextTick( () => { stdin.send(input) } )
        const result = await readFiles([])
        should(result).eql([input])
    })

    it('reads single existing file', () => {
        let result = readFiles(['test/fixtures/test1.pgn'])
        should(result).eql(['e4 * d4 * c4 *'])
    });

    it('throws error on missing file', () => {
        should.throws(() => {
            readFiles(['test/fixtures/test-missing.pgn'])
        })
    })

    it('reads multiple existing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test2.pgn'])
        should(result[0]).eql('e4 * d4 * c4 *')
        should.exist(result[1])
    })

    it('reads existing files but throws error on missing', () => {
        should.throws(() => {
            readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'])
        })
    })
})

describe('When using readFiles with maps for file names', () => {
    let stdin

    beforeEach( () => { stdin = require('mock-stdin').stdin() } )

    xit('reads from stdin when no files are given', async () => {
        const input = 'input data';
        process.nextTick( () => { stdin.send(input) } )
        const result = await readFiles([], { mapInput: true })
        should(result).eql([input])
    })

    it('reads single existing file', () => {
        let result = readFiles(['test/fixtures/test1.pgn'], { mapInput: true }) as Map<string, string>
        should.exist(result)
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
    });

    it('throws error on missing file', () => {
        should.throws(() => {
            readFiles(['test/fixtures/test-missing.pgn'], { mapInput: true })
        })
    })

    it('reads multiple existing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test2.pgn'], { mapInput: true }) as Map<string, string>
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
        should(result.size).eql(2)
    })

    it('reads existing files but throws error on missing', () => {
        should.throws(() => {
            readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'], { mapInput: true })
        })
    })
})

describe("When handling errors in reading files", () => {
    beforeEach( () => {
        // @ts-ignore
        //process.chdir(path.dirname(require.main.filename));
        async function deleteFile(filePath) {
            try {
                await unlinkSync(filePath)
            } catch (err) {  }
        }
        deleteFile('./read.log');
    })

    it('should throw error on missing file', () => {
        should.throws(() => {
            readFiles(['test/fixtures/test-missing.pgn'], { mapInput: true })
        })
    })
    it('should read all files if possible, and warn when missing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'], { mapInput: true, errorHandling: 'warn' }) as Map<string, string>
        should.exist(result)
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
        should(result.size).eql(2)
    })
    it('should read all files if possible, and log when missing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'], { mapInput: true, errorHandling: 'log' }) as Map<string, string>
        should.exist(result)
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
        should(result.size).eql(2)
    })
})
