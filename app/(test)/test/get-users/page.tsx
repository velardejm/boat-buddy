import { getUsers } from "@/lib/data";

export default async function Page() {
  const data = await getUsers();
  const users = data?.rows;
  return (
    <div>
      <ul>{users ? users.map((user) => <li key={user.username}>{user.username}</li>) : null}</ul>
    </div>
  );
}
