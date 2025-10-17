import { getAllUsers } from '@/services/users.service';

export async function getAllUserLoader() {
  try {
    const users = await getAllUsers();
    return { users };
  } catch {
    return { users: [] };
  }
}
