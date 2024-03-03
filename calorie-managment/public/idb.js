const openCalorisDB = (dbname, dbversion) => {
  //Opening the data-base and if it doesnt exist - create it
  const request = indexedDB.open(dbname, dbversion);

  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;
    // Create an objectStore for this database
    const calorieStore = db.createObjectStore("Items", {
      keyPath: "id",
      // autoIncrement: true,
    });
    // calorieStore.createIndex("numofcaloriesIndex", "numofcalories");
    // calorieStore.createIndex("categoryIndex", "category");
    // calorieStore.createIndex("descriptionIndex", "description");
  };

  request.onsuccess = (event) => {
    // Save the IDBDatabase interface
    db = event.target.result;
  };

  return request;
};

const addCalories = (item) => {
  let tx = db.transaction("Items", "readwrite");
  tx.oncomplete = (ev) => {
    console.log(ev);
  };
  tx.onerror = (error) => {
    console.warn(error);
  };
  let store = tx.objectStore("Items");
  let request = store.add(item);
  request.onsuccess = (ev) => {
    console.log("Successfully Added an Object");
  };
  request.onerror = (err) => {
    console.log("Error in request to add");
  };
};
