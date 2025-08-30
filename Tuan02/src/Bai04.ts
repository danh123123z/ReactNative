// 4. Use .then() and .catch() to handle a Promise that returns a random number.

const randomPromise = new Promise((resolve, reject) => {
  const num = Math.random();
  if (num > 0.5) {
    resolve(num);
  } else {
    reject("Số quá nhỏ");
  }
});

randomPromise
  .then(num => console.log("Thành công:", num))
  .catch(err => console.error("Thất bại:", err));