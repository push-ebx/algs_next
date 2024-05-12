"use client"

import React, {useEffect, useState} from "react";
import styles from './edit.module.scss';
import {CustomMarkdown, CustomMDEditor} from "@/app/ui";
import {useRouter, useSearchParams} from 'next/navigation';
import {Article} from "@/app/lib/types";
import clsx from "clsx";
import {getArticleById, updateArticle} from "@/app/article/api";
import {Button, Checkbox, Form, Input, message, Modal} from "antd";
import {createArticle} from "@/app/create/api";
import {Loader} from "@/app/ui/loader";

export default function Edit() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [value, setValue] = useState<string | undefined>();
  const [article, setArticle] = useState<Article>();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    id && getArticleById({article_id: +id!}).then(res => {
      setArticle(res.data);
      setValue(res.data?.content);
    })
  }, [])

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();

      if (!article?.id) {
        message.error('Статья не найдена!');
        return;
      }

      if (!value) {
        message.error('Необходимо содержимое статьи!');
        return;
      }

      const res = await updateArticle({
        id: article?.id,
        title: values.title,
        category: values.category,
        subcategory: values.subcategory,
        is_draft: values.is_draft,
        content: value
      });

      setTimeout(() => {
        if (res.success) {
          message.success('Статья успешно отредактирована и отправлена на проверку модерации!');
        } else {
          message.error('Произошла ошибка при редактировании статьи!');
        }

        setOpen(false);
        form.resetFields();
        setConfirmLoading(false);
        router.push(`/profile`, { scroll: false });
      }, 500);
    } catch (err) {
      console.error('Validation failed:', err);
      setConfirmLoading(false);
    }
  };


  return (
    <div className={styles.editor}>
      {
        !value ? <Loader/> :
          <div className={styles.editor__main}>
            <CustomMDEditor
              value={value}
              setValue={setValue}
              className={clsx(styles['md-editor'], styles.customMDEditor)}
            />
            <CustomMarkdown className={styles['md-viewer']}>
              {value}
            </CustomMarkdown>
            <Button size={"large"} className={styles.save_button} type={"primary"} onClick={() => setOpen(true)}>
              Сохранить изменения
            </Button>
          </div>
      }

      <Modal
        title="Редактировние статьи"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        centered
        confirmLoading={confirmLoading}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleCreate}>
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название статьи:"
            initialValue={article?.title}
            rules={[{required: true, message: 'Пожалуйста, введите название статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория:"
            initialValue={article?.category}
            rules={[{required: true, message: 'Пожалуйста, введите категорию статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="subcategory"
            label="Подкатегория:"
            initialValue={article?.subcategory}
            rules={[{required: true, message: 'Пожалуйста, введите подкатегорию статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="is_draft"
            valuePropName="checked"
          >
            <Checkbox defaultChecked={article?.is_draft}>Черновик</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}