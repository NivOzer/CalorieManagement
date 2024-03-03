
  const openCalorisDB = (dbname, dbversion) => {
    const request = indexedDB.open(dbname, dbversion);
  
    request.onerror = (event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!");
    };
      request.onupgradeneeded = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;
        // Create an objectStore for this database
        const calorieStore = db.createObjectStore('calories', { keyPath: 'id', autoIncrement: true });
        calorieStore.createIndex('numofcaloriesIndex', 'numofcalories');
        calorieStore.createIndex('categoryIndex', 'category');
        calorieStore.createIndex('descriptionIndex', 'description');
      };
    

      request.onsuccess = (event) => {
        // Save the IDBDatabase interface
        db = event.target.result;
    };

    return request;

  };