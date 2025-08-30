// 6. Use Promise.all() to run 3 simulated Promises in parallel and print the result.

const tasks = (time: number, name: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} done`);
    }, time);
  });
}

Promise.all([
  tasks(1000, "Task 1"),
  tasks(2000, "Task 2"),
  tasks(1500, "Task 3")
]).then(results => {
  console.log("All results:", results);
});