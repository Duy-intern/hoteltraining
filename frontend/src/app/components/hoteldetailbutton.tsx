
import { Button } from 'antd';
import Link from 'next/link';

export default function DetailButton() {
  return (
    <div className="flex justify-center">
      <Link href="/detail">
        <Button>Detail</Button>
      </Link>
    </div>
  );
}
