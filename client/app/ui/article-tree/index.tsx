"use client"

import React, {useEffect, useState} from 'react';
import styles from "./article-tree.module.scss";
import {Tree, TreeType} from "@/app/ui";
import {getTree} from "@/app/article/api";

export const ArticleTree = () => {
  const [tree, setTree] =  useState<TreeType>();

  useEffect(() => {
    getTree().then(res => setTree(res.data));
  }, []);

  return (
    <div className={styles.wrapper_tree}>
      <h2 style={{marginBottom: 20}}>{tree?.title}</h2>
      <Tree className={styles.tree} tree={tree}/>
    </div>
  );
};