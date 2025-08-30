// 26. Use async/await with setTimeout to simulate a 5-second wait.

async function wait5s() {
  console.log("Waiting 5s...");
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Done waiting!");
}

wait5s();
