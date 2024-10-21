
import { Button } from 'antd';
import Link from 'next/link';

export default function RegisterButton() {
  return (
    <div className="flex justify-center">
      <Link href="/register">
          <Button> Register</Button>
      </Link>
    </div>
  );
}
