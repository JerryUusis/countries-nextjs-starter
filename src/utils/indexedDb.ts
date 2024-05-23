import { openDB } from "idb";

const dbPromise = openDB("countries-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("countries")) {
      db.createObjectStore("countries");
    }
  },
});

const initializeDB = async () => {
  try {
    const db = await dbPromise;
    if (!db.objectStoreNames.contains("countries")) {
      console.error('Object store "countries" not found during initialization');
    }
    return db;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { initializeDB };
