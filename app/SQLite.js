import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('soundboard1000.db');

// init the database
export const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uri TEXT)'
        );


        tx.executeSql('SELECT COUNT(*) AS count FROM sounds', [], (_, results) => {
            const rowCount = results.rows.item(0).count;
            if (rowCount === 0) {
            }
        });
    });
};

// Function to fetch pre-made sounds from the database
export const fetchSavedSounds = (callback) => {
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
