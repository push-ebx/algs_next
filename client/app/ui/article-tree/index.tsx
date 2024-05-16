"use client"

import React, {useEffect, useState} from 'react';
import styles from "./article-tree.module.scss";
import {Tree, TreeType} from "@/app/ui";
import {getTree} from "@/app/article/api";
import {FloatButton} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import clsx from "clsx";

export const ArticleTree = () => {
  const [tree, setTree] =  useState<TreeType>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getTree().then(res => {
      setTree(res.data);
    });
  }, []);

  return (
    <>
      <div className={clsx(styles.wrapper_tree, isActive && styles.menu_active)}>
        <h2 style={{marginBottom: 20}}>Содержание</h2>
        <Tree className={styles.tree} tree={tree}/>
      </div>
      <FloatButton className={styles.isOpen} onClick={() => setIsActive(prev => !prev)} type={"primary"} icon={<MenuOutlined />}></FloatButton>
    </>
  );
};