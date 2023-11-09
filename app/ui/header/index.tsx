import styles from './header.module.scss'
import collapseButton from '@/public/icons/collapse-button.svg'
import user from '@/public/icons/user.svg'
import sun from '@/public/icons/sun.svg'
import Image from 'next/image';
import mooon from '@/public/icons/mooon.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <Image className="icon" src={collapseButton} alt="collapsButton"/>
      <div className={styles.logo}><span>Algs</span></div>
      <div className={styles.theme_user}>
        <Image className="icon" src={sun} alt="sun"/>
        <Image className="icon" src={user} alt="user"/>
      </div>
    </header>
  );
};

export {Header};