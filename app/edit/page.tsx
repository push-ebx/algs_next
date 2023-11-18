"use client"

import React, {useEffect, useState} from "react";
import styles from './edit.module.scss';
import {CustomMarkdown, Input, CustomMDEditor, Popup, Button} from "@/app/ui";
import {fetchArticleByID, updateArticle} from "@/app/article/api/data";
import {useRouter, useSearchParams} from 'next/navigation';
import {Article} from "@/app/lib/types";
import clsx from "clsx";

export default function Edit() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [value, setValue] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [isDraw, setIsDraw] = useState<boolean | undefined>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchArticleByID(+id!).then(res => {
      setTitle(res?.title);
      setAuthor(res?.author);
      setCategory(res?.category);
      setSubcategory(res?.subcategory);
      setIsDraw(res?.is_draw);
      setValue(res?.content);
    });
  }, [])

  const onSave = async () => {
    if (!title || !value || !author || !category || !subcategory) return;

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

    router.push(`/article?id=${article.id}`, { scroll: false });
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
        <Button className={styles.save_button} onClick={() => setIsOpen(true)}>Сохранить изменения</Button>
      </div>

      <Popup className={styles.popup} title={"Новая статья"} isOpen={isOpen} closePopup={() => setIsOpen(false)}>
        <div className={styles.inputs}>
          <Input
            onChange={val => setTitle(val)}
            value={title}
            placeholder="Название статьи"
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