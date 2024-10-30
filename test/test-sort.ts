import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { sort } from '../src';
import { parseGames } from '@mliebelt/pgn-parser';

const sortingGamesSuite = suite('When sorting a list of games');

sortingGamesSuite.before.each(() => {
    // Hier können Sie Initialisierungen vor jedem Test hinzufügen, falls erforderlich
});

sortingGamesSuite('should sort games by date', () => {
    let games = parseGames("e4 * d4 * c4 * b4 * a4 *");
    let res = sort(games);
    // Fügen Sie entsprechende Assert-Aussagen hier hinzu, um die erwarteten Ergebnisse zu überprüfen
    assert.ok(res, 'Die Spiele sollten sortiert sein');
});

sortingGamesSuite.run();