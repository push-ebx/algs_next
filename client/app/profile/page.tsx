"use client"

import styles from './profile.module.scss'
import React from "react";
import {ListArticlesWritten} from "@/app/ui/list-articles-written";
import {Tabs} from "antd";
import {Roles} from "@/app/ui/roles";
import {useAuth} from "@/app/lib/hooks/useAuth";
import {Role} from "@/app/lib/types";
import {ArticlesReview} from "@/app/ui/articles-review";


interface TabItem {
  label: string;
  key: string;
  children: JSX.Element;
  allowedRoles: Role[];
}

const tabs: TabItem[] = [
  {
    label: 'Мои статьи',
    key: '1',
    children: <ListArticlesWritten/>,
    allowedRoles: ["user", "moderator", "admin"],
  },
  {
    label: 'Администрирование ролей',
    key: '2',
    children: <Roles/>,
    allowedRoles: ["admin"],
  },
  {
    label: 'Статьи на проверку',
    key: '3',
    children: <ArticlesReview/>,
    allowedRoles: ["moderator", "admin"],
  }
];

export default function Dashboard() {
  const {user, isFetching: isFetchingUser} = useAuth();

  return (
    <div className={styles.profile}>
      {
        user ?
          <Tabs
            size={"large"}
            items={tabs.filter(tab => tab.allowedRoles.includes(user.role))}
          /> :
          ""
      }
    </div>
  );
}