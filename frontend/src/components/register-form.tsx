import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, Link, useActionData } from 'react-router';

interface ActionData {
  errors?: {
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const actionData = useActionData() as ActionData;
  const errors = actionData?.errors;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Selamat datang</CardTitle>
          <CardDescription>Daftarkan diri Anda hanya dengan beberapa data</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nama</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="Nama" />
                {errors?.name && <p className="text-sm text-red-500 mt-1">{errors?.name}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" name="username" type="text" placeholder="Username" />
                {errors?.username && (
                  <p className="text-sm text-red-500 mt-1">{errors?.username}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" />
                {errors?.password && (
                  <p className="text-sm text-red-500 mt-1">{errors?.password}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Konfirmasi Password</FieldLabel>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
                {errors?.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors?.confirmPassword}</p>
                )}
              </Field>

              <Field>
                <Button type="submit">Daftar</Button>
                <FieldDescription className="text-center">
                  Sudah punya akun?{' '}
                  <Link to={'/login'} className="underline">
                    Masuk
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
