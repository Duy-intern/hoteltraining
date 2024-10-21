
import { Button } from 'antd';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <div className="flex justify-center">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
