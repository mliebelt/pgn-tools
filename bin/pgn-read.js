#!/usr/bin/env node
const { program } = require('commander');
const {readFileSync} = require('@mliebelt/pgn-reader')

program
    .option('-f, --files <files...>', 'Files to sort')
    .option('--map', 'Create a map from filename to file content')

program.parse(process.argv)

const opts = program.opts()
console.log(`Files:  ${opts.files} Map: ${opts.map}`)

console.log(readFileSync(opts.files[0]))