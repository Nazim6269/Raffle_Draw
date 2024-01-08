const myDB = require("../db/db");

myDB.create("user1", 10);
myDB.create("user2", 10);
myDB.create("user3", 10);
myDB.create("user4", 10);
myDB.create("user5", 10);

const bulk = myDB.bulkTicket("user 6", 10, 3);
//console.log("bulk", bulk);
const tickets = myDB.find();
//console.log("first", tickets);

const winners = myDB.draw(3);
//console.log("second", winners);

const arr = new Array(4);
console.log(arr);

arr.forEach((item) => {
  console.log(item);
});
