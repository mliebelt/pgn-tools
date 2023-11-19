const program = require('commander');

program
  .command('sort <file>', 'sort pgn files', { executableFile: './pgn-sort.js' })

program.parse(process.argv);
