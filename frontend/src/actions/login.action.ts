import { loginUser } from '@/services/auth.service';
import { redirect, type ActionFunctionArgs } from 'react-router';

export async function loginAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const dto = Object.fromEntries(formData);
    const data = await loginUser(dto);

    localStorage.setItem('accessToken', data.accessToken);
    return redirect('/');
  } catch (error) {
    return { error: (error as Error).message };
  }
}
