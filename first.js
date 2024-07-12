const fetchdata = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done!");
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log("timer is done!");

  fetchdata()
    .then((text) => {
      console.log(text);
      return fetchdata();
    })
    .then((text2) => {
      console.log(text2);
    });
}, 2000);

// const fetchdata = (callback) => {
//   setTimeout(() => {
//     callback("Done");
//   }, 1500);
// };

// setTimeout(() => {
//   console.log("timer is done ");
//   fetchdata((text) => {
//     console.log(text);
//   });
// }, 2000);

console.log("hello!");
console.log("hi");

// const fs = require("fs");
// fs.writeFileSync("hello.txt", "hello from node.js");
// const name = "max";
// let age = 43;
// const hobby = true;
// age = 30;
// const summrizeuser = (username, userage, userhashobby) => {
//   return (
//     "name is " + username + ", age is " + userage + ", hobby is " + userhashobby
//   );
// };

// console.log(summrizeuser(name, age, hobby));
// const hobbies = ["sport", "cooking"];
// const copiearray = [hobbies];
// console.log(copiearray);

// const toarray = (...args) => {
//   return args;
// };
// console.log(toarray(1, 2, 3, 4));
