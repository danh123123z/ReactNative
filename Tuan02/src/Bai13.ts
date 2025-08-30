// 13. Handle errors using try/catch with async/await.

function simulateErrorTask(time: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Có lỗi xảy ra");
    }, time);
  });
}

async function run() {
  try {
    const result = await simulateErrorTask(1000);
    console.log(result);
  } catch (err) {
    console.error("Bắt lỗi:", err);
  }
}

run();