"use client"

import styles from './profile.module.scss'
import React from "react";
import {ListArticlesWritten} from "@/app/ui/list-articles-written";

export default function Dashboard() {
  return (
    <div className={styles.profile}>
      <ListArticlesWritten/>
    </div>
  );
}