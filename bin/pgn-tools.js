const program = require('commander');

program
  .command('sort -f <files> <options>', 'sort pgn files', { executableFile: './pgn-sort.js' })
  .command('strip -f <files> <options>', 'strip pgn files', { executableFile: './pgn-strip.js' })
  .command('parse -f <files> <options>', 'parse pgn files', { executableFile: './pgn-parse.js' })

program.parse(process.argv);
