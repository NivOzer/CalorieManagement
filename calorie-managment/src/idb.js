const idb = {
  // Function to open the IndexedDB database
  openCalorisDB: (dbname, dbversion) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbname, dbversion);

      request.onerror = (event) => {
        reject("Failed to open database");
      };
      // Event handler for database upgrade needed
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const calorieStore = db.createObjectStore("items", {
          keyPath: "id",
          autoIncrement: true,
        });
        calorieStore.createIndex("categoryIndex", "category");
      };
      // Event handler for database opening success
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
    });
  },
  //addCalories function- add item to IndexedDB
  addCalories: (db, calorieData) => {
    return new Promise((resolve, reject) => {
      // Start a transaction to perform database operations
      const transaction = db.transaction(["items"], "readwrite");
      const store = transaction.objectStore("items");
      const addRequest = store.add(calorieData);
      // Event handler for addRequest error- ERROR
      addRequest.onerror = (event) => {
        reject("Failed to add item");
      };
      // Event handler for addRequest success- SUCCESS
      addRequest.onsuccess = (event) => {
        resolve("item added successfully");
      };
    });
  },

  //used by REPORT to get all items in IndexedDB
  getAllItems: (db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["items"], "readonly");
      const store = transaction.objectStore("items");
      const request = store.getAll();
      // Event handler for addRequest error- ERROR
      request.onerror = (event) => {
        reject("Failed to retrieve items");
      };
      // Event handler for addRequest success- SUCCESS
      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });
  },
};

export default idb;
