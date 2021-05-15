import { IoReturnDownBackSharp } from "react-icons/io5";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

export default function Header() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header>
        <Link href="/">
          <Image src="/logo.svg" width={276} height={185} objectFit="cover" alt="mova" />
        </Link>
        { router.pathname !== '/' ? (
          <button type="button" className={styles.backButton} onClick={() => router.back()}>
            <IoReturnDownBackSharp size={24} />
            <span>Voltar</span>
          </button>
        ) : null }
      </header>
    </div>
  )
}
