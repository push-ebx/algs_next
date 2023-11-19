"use client"

import React, {useState} from "react";
import styles from './create.module.scss';
import {Button, CustomMarkdown, Input} from "@/app/ui";
import {CustomMDEditor} from "@/app/ui/markdownEditor";
import {Popup} from "@/app/ui/popup";
import {createArticle, getLastArticleID} from "@/app/article/api/data";
import {Article} from "@/app/lib/types";
import clsx from "clsx";
import { useRouter } from 'next/navigation';

export default function Create() {
  const [value, setValue] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [header_image, setHeaderImage] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (!title || !value || !author || !category || !subcategory) return;

    const article: Article = {
      title,
      header_image,
      category,
      subcategory,
      is_draw: isDraw,
      author,
      content: value
    };

    await createArticle(article);
    setIsOpen(false);
    const article_id = await getLastArticleID();
    router.push(`/article?id=${article_id}`, { scroll: false });
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor__main}>
        <CustomMDEditor
          value={value}
          setValue={setValue}
          className={clsx(styles['md-editor'], styles.customMDEditor)}
        />
        <CustomMarkdown className={styles['md-viewer']}>
          {value}
        </CustomMarkdown>
        <Button className={styles.save_button} onClick={() => setIsOpen(true)}>Создать статью</Button>
      </div>

      <Popup className={styles.popup} title={"Новая статья"} isOpen={isOpen} closePopup={() => setIsOpen(false)}>
        <div className={styles.inputs}>
          <Input
            onChange={val => setTitle(val)}
            value={title}
            placeholder="Название статьи"
          />
          <Input
            onChange={val => setHeaderImage(val)}
            value={header_image}
            placeholder="URL шапки"
          />
          <Input
            onChange={val => setAuthor(val)}
            value={author}
            placeholder="Автор"
          />
          <Input
            onChange={val => setCategory(val)}
            value={category}
            placeholder="Категория"
          />
          <Input
            onChange={val => setSubcategory(val)}
            value={subcategory}
            placeholder="Подкатегория"
          />
          <label className="container">
            <span>{"Опубликовать "}</span>
            <input type="checkbox" />
          </label>
          <Button onClick={() => onSave()}>Сохранить</Button>
        </div>
      </Popup>
    </div>
  )
}
