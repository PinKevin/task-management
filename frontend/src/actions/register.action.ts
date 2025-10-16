import { registerUser } from '@/services/auth.service';
import { redirect, type ActionFunctionArgs } from 'react-router';

export async function registerAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const dto = Object.fromEntries(formData);
    await registerUser(dto);

    return redirect('/login');
  } catch (error) {
    return { error: (error as Error).message };
  }
}
