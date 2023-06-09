import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database and version
  const toDoDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and privileges
  const tx = toDoDB.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method update the data
  const request = store.put({ id: 1, value: content });

  // Confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  // Error for when the request doesn't work
  console.error('putDb not implemented')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database and version
  const toDoDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and privileges
  const tx = toDoDB.transaction("jate", "readonly");

  // Open the desired object store
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all the data
  const request = store.getAll();

  // Confirmation of the request
  const result = await request;
  console.log("result.value", result);
  console.error("getDb not implemented");
};

initdb();
