let db;
const openCalorisDB = (dbname, dbversion) => {
  const request = indexedDB.open(dbname, dbversion);
  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Success");
  };
};
