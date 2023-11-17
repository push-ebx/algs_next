"use client"

import React, {useEffect, useState} from "react";
import styles from './edit.module.scss';
import {CustomMarkdown} from "@/app/ui";
import {CustomMDEditor} from "@/app/ui/markdownEditor";
import {Popup} from "@/app/ui/popup";
import {createArticle, fetchArticleByID, updateArticle} from "@/app/article/api/data";
import { useSearchParams } from 'next/navigation';
import {Article} from "@/app/lib/types";
import clsx from "clsx";

export default function Edit() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id');

  const [value, setValue] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(id);
    fetchArticleByID(+id!).then(res => {
      console.log(res);
      setValue(res?.content);
    });
  }, [])

  const onSave = async () => {
    const article: Article = {
      id: +id!,
      title,
      category,
      subcategory,
      is_draw: isDraw,
      author,
      content: value
    };

    await updateArticle(article);
    setIsOpen(false);
  }

  return (
    <div className={styles.editor}>
      <div className={styles.main}>
        <CustomMDEditor
          value={value}
          setValue={setValue}
          className={clsx(styles['md-editor'], styles.customMDEditor)}
        />

        <CustomMarkdown
          className={styles['md-viewer']}
        >
          {value}
        </CustomMarkdown>

        <Popup className={styles.popup} title={"Title"} isOpen={isOpen} closePopup={() => setIsOpen(false)}>
          <div className={styles.inputs}>
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Название статьи"
            />
            <input
              onChange={e => setAuthor(e.target.value)}
              type="text"
              placeholder="Автор"
            />
            <input
              onChange={e => setCategory(e.target.value)}
              type="text"
              placeholder="Категория"
            />
            <input
              onChange={e => setSubcategory(e.target.value)}
              type="text"
              placeholder="Подкатегория"
            />
            <label className="container">
              <span>{"Опубликовать "}</span>
              <input type="checkbox" />
            </label>
            <button onClick={() => onSave()}>Сохранить</button>
          </div>
        </Popup>
      </div>
      <button onClick={() => setIsOpen(true)}>Сохранить</button>
    </div>
  )
}