// 7. Use Promise.race() to return whichever Promise resolves first.

function runTask(time: number, name: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} done`);
    }, time);
  });
}

Promise.race([
  runTask(1000, "Task 1"),
  runTask(2000, "Task 2"),
  runTask(1500, "Task 3")
]).then(result => {
  console.log("First finished:", result);
});