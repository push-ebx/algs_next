import styles from './header.module.scss'
import Link from "next/link";
import {User} from "@/app/ui/user";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <span>Algs</span>
        </Link>
      </div>
      <User />
    </header>
  );
};

export {Header};