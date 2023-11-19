const program = require('commander');

program
    .option('-f, --files <files...>', 'files to sort')
program.parse(process.argv)

const opts = program.opts()

console.log(`files: ${opts.files}`)
