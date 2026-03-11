import { VendorSelectField } from '@/features/products/add-product';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

export function LoginPage() {
  const [vendor, setVendor] = useState('');
  return (
    <div style={{ padding: '50px' }}>
      <h1>Login</h1>

      <Input />

      <br />
      <br />

      <VendorSelectField value={vendor} onChange={setVendor} />
    </div>
  );
}
