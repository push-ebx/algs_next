import styles from './header.module.scss'
import collapseButton from '@/public/icons/collapse-button.svg'
import user from '@/public/icons/user.svg'
import sun from '@/public/icons/sun.svg'
import Image from 'next/image';
import mooon from '@/public/icons/mooon.svg'
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/article?id=7"}>
          <span>Algs</span>
        </Link>
      </div>
      <div className={styles.theme_user}>
        <Image className="icon" src={user} alt="user"/>
      </div>
    </header>
  );
};

export {Header};