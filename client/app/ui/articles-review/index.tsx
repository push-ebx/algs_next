import styles from './styles.module.scss'
import {useAuth} from "@/app/lib/hooks/useAuth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Article, ResponseDeleteArticle} from "@/app/lib/types";
import {getArticles, setApproveArticle} from "@/app/profile/api";
import {deleteArticle, getAllArticles, getArticleById} from "@/app/article/api";
import {
  Button,
  Divider,
  Empty,
  Flex,
  message,
  Modal,
  Popconfirm, Skeleton,
  Switch,
  Table,
  TableProps,
  Tooltip,
  Typography
} from "antd";
import { DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import Link from "next/link";
import {Loader} from "@/app/ui/loader";
import {CustomMarkdown, Subtitle} from "@/app/ui";

export const ArticlesReview = () => {
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>();
  const [isDelay, setIsDelay] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>();

  useEffect(() => {
    getAllArticles().then(data => {
      setArticles(data);

      setTimeout(() => {
        setIsDelay(false);
      }, 500);
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

  const handleSetApprove = async ({article_id, is_approved}: {article_id: number, is_approved: boolean}) => {
    const res = await setApproveArticle({article_id, is_approved});

    if (res?.success) {
      if (is_approved) message.success('Статья успешно опубликована!');
      else message.success('Статья убрана из списка опубликованных!');
    } else {
      message.error(`${res?.message}`);
    }
  }

  const handleViewButton = async ({article_id}: {article_id: number}) => {
    setOpen(true);
    const res = await getArticleById({article_id});
    setCurrentArticle(res?.data);
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
      title: 'Имя автора',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Опубликовать',
      dataIndex: 'is_approved',
      key: 'is_approved',
      align: 'center',
      render: (is_approved, article) => (
        <Switch
          defaultChecked={is_approved}
          onChange={check => handleSetApprove({article_id: article.id!, is_approved: check})}
        />
      )
    },
    {
      title: 'Просмотр',
      key: 'view',
      align: 'center',
      render: (_, article) => (
        <Button type={"primary"} onClick={() => handleViewButton({article_id: article.id!})}
        >
          Подробнее
        </Button>
      )
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
    <>
      {
        isFetchingUser && !user?.id || isDelay ?
          <Loader/> :
          <div className={styles.list}>
            {
              articles?.length ?
                <Flex vertical>
                  <Flex justify={"space-between"} align={"center"}>
                    <Subtitle className={styles.title}>Список статей</Subtitle>
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
                    bordered
                    scroll={{ x: 1500 }}
                    pagination={{ defaultPageSize: 10, position: ["bottomCenter"] }}
                  />
                </Flex> :
                <Empty className={styles.empty} description={"Статей для проверки не найдено"} />
            }
          </div>
      }

      <Modal
        title={"Просмотр статьи"}
        open={open}
        onCancel={() => {
          setOpen(false);
          setCurrentArticle(null);
        }}
        centered
        footer={[]}
      >
        {
          currentArticle ?
            <CustomMarkdown className={styles['md-viewer']}>
              {currentArticle.content}
            </CustomMarkdown> :
            <Flex vertical gap={5}>
              {Array(7).fill(<Skeleton active/>)}
            </Flex>
        }
      </Modal>
    </>
  );
};