import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('soundboard1000300.db');

// init the database
export const initDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sounds (id INTEGER PRIMARY KEY, name TEXT, uri TEXT)'
        );


        tx.executeSql('SELECT COUNT(*) AS count FROM sounds', [], (_, results) => {
            const rowCount = results.rows.item(0).count;
            if (rowCount === 0) {
              tx.executeSql('INSERT INTO sounds (id, name, uri) VALUES (1, NULL, NULL)');
              tx.executeSql('INSERT INTO sounds (id, name, uri) VALUES (2, NULL, NULL)');
              tx.executeSql('INSERT INTO sounds (id, name, uri) VALUES (3, NULL, NULL)');
            }
        });
    });
};

// Function to fetch saved sounds from the database
export const fetchSavedSounds = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT id, name, uri FROM sounds',
      [],
      (_, { rows }) => {
        const sounds = [];
        for (let i = 0; i < rows.length; i++) {
          sounds.push(rows.item(i));
        }
        callback(sounds);
      },
      error => {
        console.log('Error fetching sounds: ', error);
        callback([]); // Provide an empty array in case of an error
      }
    );
  });
};

// Function to update a sound 
export const updateSavedSound = (id, name, uri) => {
  console.log( "database sounds input => " + id, name, uri)

  db.transaction(tx => {
    tx.executeSql(
      'UPDATE sounds SET name = ?, uri = ? WHERE id = ?',
      [name, uri, id],
      (_, { rows }) => {
        console.log('Sound updated');
      },
      error => {
        console.log('Error updating sound: ', error);
      }
    );
  });
}
