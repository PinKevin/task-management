import { formatErrors } from '@/helper/format-errors';
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
    if (error instanceof Response && error.status === 400) {
      const errorData = await error.json();
      return { errors: formatErrors(errorData.message) };
    }
    if (error instanceof Response && error.status === 401) {
      const errorData = await error.json();
      return { checkUserError: errorData.message };
    }
    return { error: 'Terjadi kesalahan tidak terduga.' };
  }
}
