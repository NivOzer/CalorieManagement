const idb = {
  openCalorisDB: (dbname, dbversion) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbname, dbversion);

      request.onerror = (event) => {
        reject("Failed to open database");
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const calorieStore = db.createObjectStore("Items", {
          keyPath: "id",
          autoIncrement: true,
        });
        calorieStore.createIndex("calorieIndex", "calorie");
        calorieStore.createIndex("categoryIndex", "category");
        calorieStore.createIndex("descriptionIndex", "description");
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const dbObject = {
          addCalories: (item) => {
            return new Promise((resolve, reject) => {
              const transaction = db.transaction(["Items"], "readwrite");
              const store = transaction.objectStore("item");
              const addRequest = store.add(calorieData);

              addRequest.onerror = (event) => {
                reject("Failed to add calorie");
              };

              addRequest.onsuccess = (event) => {
                resolve("Calorie added successfully");
              };
            });
          },
        };
        resolve(dbObject);
      };
    });
  },
};

module.exports = { openCalorisDB, addCalories };
