const idb = {
  openCalorisDB: (dbname, dbversion) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbname, dbversion);

      request.onerror = (event) => {
        reject("Failed to open database");
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const calorieStore = db.createObjectStore("items", {
          keyPath: "id",
          autoIncrement: true,
        });
        calorieStore.createIndex("categoryIndex", "category");
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
    });
  },
  addCalories: (db, calorieData) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["items"], "readwrite");
      const store = transaction.objectStore("items");
      const addRequest = store.add(calorieData);
      addRequest.onerror = (event) => {
        reject("Failed to add item");
      };

      addRequest.onsuccess = (event) => {
        resolve("item added successfully");
      };
    });
  },

  
  getAllItems: (db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['items'], 'readonly');
      const store = transaction.objectStore('items');
      const request = store.getAll();

      request.onerror = (event) => {
        reject("Failed to retrieve items");
      };

      request.onsuccess = (event) => {
        resolve(request.result);
      };
    });

  }






};

export default idb;
