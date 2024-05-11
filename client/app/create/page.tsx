"use client"

import React, {useState} from "react";
import styles from './create.module.scss';
import {Button, CustomMarkdown, Input} from "@/app/ui";
import {CustomMDEditor} from "@/app/ui/markdownEditor";
import {Popup} from "@/app/ui/popup";
import {createArticle} from "./api";
import {Article} from "@/app/lib/types";
import clsx from "clsx";
import { useRouter } from 'next/navigation';

export default function Create() {
  const [content, setContent] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('');
  const [header_image, setHeaderImage] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [is_draft, setIsDraft] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (!title || !content || !category || !subcategory) return;

    const article: Article = {
      title,
      category,
      subcategory,
      is_draft,
      content
    };

    await createArticle(article);
    setIsOpen(false);
    router.push(`/profile`, { scroll: false });
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor__main}>
        <CustomMDEditor
          value={content}
          setValue={setContent}
          className={clsx(styles['md-editor'], styles.customMDEditor)}
        />
        <CustomMarkdown className={styles['md-viewer']}>
          {content}
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
