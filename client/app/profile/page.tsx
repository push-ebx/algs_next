"use client"

import {getArticles} from "./api";
import styles from './profile.module.scss'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Article} from "@/app/lib/types";
import {useAuth} from "@/app/lib/hooks/useAuth";
import {Loader} from "@/app/ui/loader";
import {useRouter} from "next/navigation";
import {columns} from "@/app/ui/article-row";
import {FloatButton, Table, Typography, Tooltip, Flex, Empty} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>();
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  useEffect(() => {
    if (!user?.id && !isFetchingUser) {
      router.push(`/auth`, { scroll: false });
    }
  }, [user]);

  return (
    <div className={styles.profile}>
      {
        isFetchingUser && !user?.id ?
          <Loader/> :
          <div className={styles.list}>
            {
              articles?.length ?
                <Flex vertical>
                  <Typography.Title level={2}>Список написанных статей</Typography.Title>
                  <Table columns={columns} dataSource={articles} scroll={{ x: 100 }} />
                </Flex> :
                  <Empty className={styles.empty} description={"Вы еще не написал ни одной статьи!"} />
            }
          </div>
      }
      <Link href={'/create'}>
        <Tooltip title={"Создать статью"}>
          <FloatButton icon={<PlusOutlined />} type="default" style={{ right: 50, bottom: 50 }} />
        </Tooltip>
      </Link>
    </div>
  );
}