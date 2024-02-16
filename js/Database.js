var db;
$(document).ready(function () {  
    var request = indexedDB.open("MyEventDB", 1);
  
    // Handle database creation or upgrade
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
  
      // Create an object store (similar to a table in relational databases)
      var objectStore = db.createObjectStore("MyEvent", { keyPath: "id", autoIncrement: true });
  
      // Define the schema of your data (you can add more fields as needed)
      objectStore.createIndex("fName", "fName", { unique: false });
      objectStore.createIndex("lName", "lName", { unique: false });
      objectStore.createIndex("phone", "phone", { unique: false });
      objectStore.createIndex("email", "email", { unique: false });
      objectStore.createIndex("guests", "guests", { unique: false });
      objectStore.createIndex("eDetail", "eDetail", { unique: false });
    };
  
    // Handle successful database opening
    request.onsuccess = function (event) {
       db = event.target.result;
  
      
    };
  
    // Handle errors
    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
    };
  
   
  });
  function addBookingData(fname,lname,phone,email,guests,edetail) {
    var transaction = db.transaction(["MyEvent"], "readwrite");
    var objectStore = transaction.objectStore("MyEvent");
  
    // Sample data to be added
    var data = {fName:fname, lName: lname,phone:phone,email:email,guests:guests,eDetail:edetail };
  
    // Use the add method without specifying a key, as it will be auto-generated
    var request = objectStore.add(data);
  
    // Handle the success or error of the add operation
    request.onsuccess = function (event) {
      console.log("Data added successfully! Key:", event.target.result);
    };
  
    request.onerror = function (event) {
      console.error("Error adding data:", event.target.error);
    };
  }

  // Function to fetch data from the MyObjectStore table
function fetchBookingData() {
    var transaction = db.transaction(["MyBooking"], "readonly");
    var objectStore = transaction.objectStore("MyBooking");

    // Open a cursor to iterate over the data
    var request = objectStore.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            // Access the data from the cursor
            var data = cursor.value;
            console.log("Fetched data:", data);

            // Continue to the next item in the cursor
            cursor.continue();
        } else {
            // No more items in the cursor
            console.log("All data fetched");
        }
    };

    request.onerror = function (event) {
        console.error("Error fetching data:", event.target.error);
    };
}
