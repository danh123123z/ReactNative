// 19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.

async function fetchUser19(id: number): Promise<{ id: number; name: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id, name: `User ${id}` };
}

async function fetchUsers19(ids: number[]): Promise<{ id: number; name: string }[]> {
  const users = [];
  for (const id of ids) {
    users.push(await fetchUser19(id));
  }
  return users;
}

async function run19() {
  const result = await fetchUsers19([1, 2, 3]);
  console.log(result);
}

run19();
