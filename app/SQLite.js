import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('soundboard2.db');

// init the database
export const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uri TEXT)'
        );


        tx.executeSql('SELECT COUNT(*) AS count FROM sounds', [], (_, results) => {
            const rowCount = results.rows.item(0).count;
            if (rowCount === 0) {
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['Bonk', '../sounds/bonk.mp3']);
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['Death', '../sounds/death.mp3']);
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['huh', '../sounds/huh.mp3']);
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['meow', '../sounds/meow.mp3']);
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['pistol', '../sounds/pistol.mp3']);
                tx.executeSql('INSERT INTO sounds (name, uri) VALUES (?, ?)', ['win', '../sounds/win.mp3']);
            }
        });
    });
};

// Function to fetch pre-made sounds from the database
export const fetchPreMadeSounds = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT name, uri FROM sounds',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      error => {
        console.log('Error fetching sounds: ', error);
      }
    );
  });
};
