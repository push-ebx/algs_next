import React from 'react';
import styles from './popup.module.scss';
import cross from "@/public/icons/cross.svg"
import clsx from "clsx";
import Image from "next/image";

type PropType = {
  children?: React.ReactNode,
  isOpen: boolean,
  closePopup: () => any,
  title: string,
  className?: string,
}

const Popup = ({children, title, closePopup, isOpen, className}: PropType) => {
  return (
    <div className={clsx(styles.popup, isOpen && styles.active)} onClick={closePopup}>
      <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_cross}>
          <h2 className={styles.title}>{title}</h2>
          <Image className={styles.cross} src={cross} alt="cross" onClick={closePopup}/>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export {Popup};