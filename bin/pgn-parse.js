#!/usr/bin/env node
const { program } = require('commander');
const { filesToJson } = require("..");

program
    .option('-f, --files <files...>', 'Files to parse')
    .option('-p, --pretty', 'Output formatted json')
program.parse(process.argv)

const opts = program.opts()

const main = (process) => {

  const gamesParsed = filesToJson(opts.files);

  const gamesJson = JSON.stringify(gamesParsed, null, opts.pretty ? 2 : undefined)

  console.log(gamesJson)
};

main(process);
