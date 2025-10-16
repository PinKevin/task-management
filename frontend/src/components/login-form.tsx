import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, Link, useActionData } from 'react-router';

interface ActionData {
  error?: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const actionData = useActionData() as ActionData;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Selamat datang</CardTitle>
          <CardDescription>Masuk menggunakan username dan password Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" name="username" type="text" placeholder="Username" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>

              {actionData?.error && (
                <p className="text-sm text-red-500 text-center">{actionData.error}</p>
              )}

              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Belum punya akun?{' '}
                  <Link to={'/register'} className="underline">
                    Daftar
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
