import styles from './styles.module.scss'
import {useAuth} from "@/app/lib/hooks/useAuth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Article, ResponseDeleteArticle} from "@/app/lib/types";
import {getArticles} from "@/app/profile/api";
import {deleteArticle} from "@/app/article/api";
import {Button, Divider, Empty, Flex, message, Popconfirm, Table, TableProps, Tooltip, Typography} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import Link from "next/link";
import {Loader} from "@/app/ui/loader";
import {Subtitle} from "@/app/ui";

export const ListArticlesWritten = () => {
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>();
  const [isDelay, setIsDelay] = useState(true);

  useEffect(() => {
    getArticles().then(data => {
      setArticles(data);

      // setTimeout(() => {
      //   setIsDelay(false);
      // }, 500);
    });
  }, []);

  const handleDeleteArticle = async (article: Article) => {
    if (!article.id) return;

    const res: ResponseDeleteArticle =  await deleteArticle({ article_id: article.id });

    if (res.success) {
      setArticles(prev => prev?.filter(_article => _article.id !== article.id));
      message.success('Статья успешно удалена!');
    } else {
      message.error(`${res.message}`);
    }
  }

  const columns: TableProps<Article>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text) => <Typography.Title level={5}>{text}</Typography.Title>,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Подкатегория',
      dataIndex: 'subcategory',
      key: 'subcategory',
      align: 'center',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Опубликована',
      dataIndex: 'is_approved',
      key: 'is_approved',
      align: 'center',
      render: (is_approved) => is_approved ?
        <Tooltip title={"Статья одобрена модератором и опубликована"}><CheckOutlined style={{color: 'green'}} /></Tooltip> :
        <Tooltip title={"Статья находится на проверке модерации"}><CloseOutlined style={{color: 'red'}} /></Tooltip>,
    },
    {
      title: 'Готовность',
      dataIndex: 'is_draft',
      key: 'is_draft',
      align: 'center',
      render: (is_draft) => is_draft ?
        <Tooltip title={"Статья находится на стадии написания"}><CloseOutlined style={{color: 'red'}} /></Tooltip> :
        <Tooltip title={"Статья готова"}> <CheckOutlined style={{color: 'green'}} /></Tooltip>
    },
    {
      title: 'Редактировать',
      key: 'edit',
      align: 'center',
      render: (_, record) => (
        <Link href={`/edit?id=${record.id}`}>
          <Tooltip title={"Редактировать статью"}>
            <EditOutlined style={{color: "#41a0ff"}}/>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: 'Удалить',
      key: 'edit',
      align: 'center',
      render: (_, record) => (
        <Tooltip title={"Удалить статью"}>
          <Popconfirm
            title="Удаление статьи"
            description={<>Вы действительно хотите <br/> удалить данную статью?</>}
            onConfirm={() => handleDeleteArticle(record)}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined style={{color: "red", cursor: "pointer"}}/>
          </Popconfirm>
        </Tooltip>
      ),
    },
  ]

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
                  <Flex justify={"space-between"} align={"center"}>
                    <Subtitle className={styles.title}>Список написанных статей</Subtitle>
                    <Link href={'/create'}>
                      <Tooltip title={"Создать статью"} placement={"left"}>
                        <Button type={"primary"} shape={"circle"} icon={<PlusOutlined />} />
                      </Tooltip>
                    </Link>
                  </Flex>
                  <Divider/>
                  <Table
                    columns={columns}
                    dataSource={articles}
                    scroll={{ x: 100 }}
                    pagination={{ defaultPageSize: 10, position: ["bottomCenter"] }}
                  />
                </Flex> :
                <Empty className={styles.empty} description={"Вы еще не написал ни одной статьи!"} />
            }
          </div>
      }
    </div>
  );
};