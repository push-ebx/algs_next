"use client"

import {Flex, Skeleton} from 'antd';
import styles from './styles.module.scss'
import {useAuth} from "@/app/lib/hooks/useAuth";
import Link from "next/link";

export const User = () => {
  const {user, isFetching: isFetchingUser} = useAuth();

  return (
    <Flex align={"center"}>
      {
        isFetchingUser ?
          <Skeleton.Input active/> :
          !user?.id ?
            <Link href={"/auth"}> Войти </Link> :
            <Link href={"/profile"}> {user?.username} </Link>
      }
    </Flex>
  );
};