import { suite } from 'uvu';
import assert from 'uvu/assert';
import {readFiles, sort} from "../src"
import * as reader from "@mliebelt/pgn-reader"
import { parseGames } from "@mliebelt/pgn-parser"
import {unlink, unlinkSync} from 'fs'
import path = require('path')

const readingFilesNoMap = suite('When using readFiles with no map for file names')
/*

    xit('reads from stdin when no files are given',  (done: Done) => {
        const input = 'input data';
        const mock = require('mock-stdin').stdin();
        process.nextTick( () => { mock.send(input)
          mock.end()} )
        const result = readFiles([])
        should(result).eql([input])
        done()
    })
*/

readingFilesNoMap('reads single existing file', () => {
    let result = readFiles([path.resolve(__dirname,'./fixtures/test1.pgn')])
    assert.is(result[0],'e4 * d4 * c4 *')
})

readingFilesNoMap('throws error on missing file', () => {
    assert.throws(() => {
        readFiles([path.resolve(__dirname,'./fixtures/test-missing.pgn')])
    })
})

readingFilesNoMap('reads multiple existing files', () => {
    let result = readFiles([path.resolve(__dirname,'./fixtures/test1.pgn'), path.resolve(__dirname,'fixtures/test2.pgn')])
    assert.is(result[0],'e4 * d4 * c4 *')
    assert.ok(result[1])
})

readingFilesNoMap('reads existing files but throws error on missing', () => {
    assert.throws(() => {
        readFiles(['./fixtures/test1.pgn', 'fixtures/test-missing.pgn'])
    })
})
readingFilesNoMap.run()


const readingFilesWithMap = suite('When using readFiles with maps for file names')
    /*xit('reads from stdin when no files are given',  (done: Done) => {
        const input = 'input data';
        const mock = require('mock-stdin').stdin();
        process.nextTick( () => { mock.send(input)
         mock.end() } )
        const result =  readFiles([], { mapInput: true })
        should(result).eql([input])
        done()
    })*/

readingFilesWithMap('reads single existing file', () => {
    let fixtureFile = path.resolve(__dirname,'./fixtures/test1.pgn')
    let result = readFiles([fixtureFile], { mapInput: true }) as Map<string, string>
    assert.ok(result)
    assert.is(result.get(fixtureFile),'e4 * d4 * c4 *')
})

readingFilesWithMap('throws error on missing file', () => {
    assert.throws(() => {
        readFiles([path.resolve(__dirname,'./fixtures/test-missing.pgn')], { mapInput: true })
    })
})

readingFilesWithMap('reads multiple existing files', () => {
    let fix1 = path.resolve(__dirname,'./fixtures/test1.pgn')
    let fix2 = path.resolve(__dirname,'./fixtures/test2.pgn')
    let result = readFiles([fix1, fix2], { mapInput: true }) as Map<string, string>
    assert.is(result.get(fix1),'e4 * d4 * c4 *')
    assert.is(result.size,2)
})

readingFilesWithMap('reads existing files but throws error on missing', () => {
    assert.throws(() => {
        readFiles([path.resolve(__dirname,'./fixtures/test1.pgn'), path.resolve(__dirname,'./fixtures/test-missing.pgn')], { mapInput: true })
    })
})
readingFilesWithMap.run()


const readingFilesHandlingErrors = suite("When handling errors in reading files")
readingFilesHandlingErrors.before.each( () => {
        // @ts-ignore
        //process.chdir(path.dirname(require.main.filename));
        async function deleteFile(filePath) {
            try {
                unlinkSync(filePath)
            } catch (err) {  }
        }
        deleteFile('./read.log');
    })

readingFilesHandlingErrors('should throw error on missing file', () => {
    assert.throws(() => {
        readFiles([path.resolve(__dirname,'./fixtures/test-missing.pgn')], { mapInput: true })
    })
})
    /*xit('should read all files if possible, and warn when missing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'], { mapInput: true, errorHandling: 'warn' }) as Map<string, string>
        should.exist(result)
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
        should(result.size).eql(2)
    })*/
/*    xit('should read all files if possible, and log when missing files', () => {
        let result = readFiles(['test/fixtures/test1.pgn', 'test/fixtures/test-missing.pgn'], { mapInput: true, errorHandling: 'log' }) as Map<string, string>
        should.exist(result)
        should(result.get('test/fixtures/test1.pgn')).eql('e4 * d4 * c4 *')
        should(result.size).eql(2)
    })*/
readingFilesHandlingErrors.run()
