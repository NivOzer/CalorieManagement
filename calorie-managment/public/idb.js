let db;
const openCalorisDB = (dbname, dbversion) => {
  const request = indexedDB.open(dbname, dbversion);

  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("success");

    request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      const db = event.target.result;
      // Create an objectStore for this database
      const objectStore = db.createObjectStore("Calories", {
        keyPath: "myKey",
      });
    };

    //   // Log success
    //   console.log("Object store 'Calories' created successfully");

    //   // Define the structure of the object store
    //   objectStore.createIndex("calorie", "calorie", { unique: false });
    //   objectStore.createIndex("category", "category", { unique: false });
    //   objectStore.createIndex("description", "description", { unique: false });

    //   // Log indexes created
    //   console.log("Indexes created successfully");
    // } else {
    //   console.log("Object store 'Calories' already exists");
    // }

    console.log(db);
    return db;
  };
};

// Function to add a calorie entry to the object store
// function addCalories(numOfCalories, category, description) {
//   dbPromise
//     .then((db) => {
//       const tx = db.transaction("calories", "readwrite");
//       const caloriesStore = tx.objectStore("calories");

//       // Add the entry to the object store
//       caloriesStore.add({ numOfCalories, category, description });

//       // Complete the transaction
//       return tx.complete;
//     })
//     .then(() => {
//       console.log("Calorie entry added successfully");
//     })
//     .catch((error) => {
//       console.error("Error adding calorie entry:", error);
//     });
// }
