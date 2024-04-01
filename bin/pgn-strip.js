#!/usr/bin/env node
const { program } = require('commander');

program
    .option('-f, --files <files...>', 'files to strip according to other options')
    .option('-t, --tags <tags...>', 'tags to strip')
    .option('--notags', 'do not include tags at all')
    .option('--novariants', 'do not include variants at all')
    .option('--nonags', 'do not include nags at all')
    .option('--nocomments', 'do not include comments at all')
    .option('--all', 'Strip everything but the main line')
program.parse(process.argv)

const opts = program.opts()

console.log(`files: ${JSON.stringify(opts)}`)

