const program = require('commander');
const { readGames } = require('..')

program
    .option('-f, --files <files...>', 'Files to sort')
    .option('--map', 'Create a map from filename to file content')

program.parse(process.argv)

const opts = program.opts()
console.log(`Files:  ${opts.files} Map: ${opts.map}`)

console.log(readGames(opts.files || [], { mapInput: opts.map } ))