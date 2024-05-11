"use client"

import React, {useEffect, useState} from "react";
import styles from './edit.module.scss';
import {CustomMarkdown, Input, CustomMDEditor, Popup, Button} from "@/app/ui";
import {useRouter, useSearchParams} from 'next/navigation';
import {Article} from "@/app/lib/types";
import clsx from "clsx";
import {getArticleById, updateArticle} from "@/app/article/api";

export default function Edit() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [value, setValue] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [header_image, setHeaderImage] = useState<string | undefined>();
  const [author, setAuthor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [is_draft, setIsDraft] = useState<boolean | undefined>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getArticleById({article_id: +id!}).then(res => {
        setTitle(res.data?.title);
        setCategory(res.data?.category);
        setSubcategory(res.data?.subcategory);
        setIsDraft(res.data?.is_draft);
        setValue(res.data?.content);
      })
    }
  }, [])

  const onSave = async () => {
    console.log(title)
    if (!title || !value || !category || !subcategory) return;

    const article: Article = {
      id: +id!,
      title,
      category,
      subcategory,
      is_draft: is_draft,
      content: value
    };

    // @ts-ignore
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
          <Button onClick={onSave}>Сохранить</Button>
        </div>
      </Popup>
    </div>
  )
}