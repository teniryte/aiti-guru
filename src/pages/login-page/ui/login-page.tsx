import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field/field';
import { Input } from '@/shared/ui/input';

export function LoginPage() {
  return (
    <div>
      <Field label="Email" size="big">
        <Input type="email" />
      </Field>

      <Field label="Password" size="big">
        <Input type="password" />
      </Field>

      <Button size="big" isBlock>
        Log In
      </Button>
    </div>
  );
}
