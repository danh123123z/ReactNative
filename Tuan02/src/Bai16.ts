// 16. Call multiple async functions in parallel using Promise.all().

async function task16(name: string, time: number): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, time));
  return `${name} done`;
}

async function run16() {
  const results = await Promise.all([
    task16("Task 1", 1000),
    task16("Task 2", 2000),
    task16("Task 3", 1500)
  ]);

  console.log("All results:", results);
}

run16();
