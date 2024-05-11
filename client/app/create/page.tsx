"use client"

import React, {useState} from "react";
import styles from './create.module.scss';
import {CustomMarkdown} from "@/app/ui";
import {CustomMDEditor} from "@/app/ui/markdownEditor";
import {createArticle} from "./api";
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import {Button, Checkbox, Form, Input, message, Modal} from "antd";

export default function Create() {
  const [content, setContent] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const router = useRouter();

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();

      if (!content) {
        message.error('Необходимо содержимое статьи!');
        return;
      }
      console.log(values)

      const res = await createArticle({
        title: values.title,
        category: values.category,
        subcategory: values.subcategory,
        is_draft: values.is_draft,
        content
      });

      setTimeout(() => {
        if (res.success) {
          message.success('Статья успешно создана и отправлена на проверку модерации!');
        } else {
          message.error('Произошла ошибка при создании статьи!');
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
      <div className={styles.editor__main}>
        <CustomMDEditor
          value={content}
          setValue={setContent}
          className={clsx(styles['md-editor'], styles.customMDEditor)}
        />
        <CustomMarkdown className={styles['md-viewer']}>
          {content}
        </CustomMarkdown>

        <Button size={"large"} className={styles.save_button} type={"primary"} onClick={() => setOpen(true)}>
          Создать статью
        </Button>
      </div>

      <Modal
        title="Создание статьи"
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
            Создать
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название статьи:"
            rules={[{required: true, message: 'Пожалуйста, введите название статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория:"
            rules={[{required: true, message: 'Пожалуйста, введите категорию статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="subcategory"
            label="Подкатегория:"
            rules={[{required: true, message: 'Пожалуйста, введите подкатегорию статьи'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="is_draft"
            valuePropName="checked"
          >
            <Checkbox>Черновик</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}