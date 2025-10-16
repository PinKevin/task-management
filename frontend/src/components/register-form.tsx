import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, Link, useActionData } from 'react-router';

interface ActionData {
  error?: string;
}

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const actionData = useActionData() as ActionData;

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
                <Input id="name" name="name" type="text" placeholder="Nama" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" name="username" type="text" placeholder="Username" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">Konfirmasi Password</FieldLabel>
                <Input id="confirm-password" name="confirm-password" type="password" required />
              </Field>

              {actionData?.error && (
                <p className="text-sm text-red-500 text-center">{actionData.error}</p>
              )}

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
