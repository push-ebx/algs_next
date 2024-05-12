import styles from './styles.module.scss'
import {useAuth} from "@/app/lib/hooks/useAuth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Article, ResponseDeleteArticle, User} from "@/app/lib/types";
import {assignRole, getArticles, getUsers} from "@/app/profile/api";
import {deleteArticle} from "@/app/article/api";
import {
  Button,
  Divider,
  Empty,
  Flex,
  message,
  Popconfirm,
  Segmented,
  Table,
  TableProps,
  Tooltip,
  Typography
} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import Link from "next/link";
import {Loader} from "@/app/ui/loader";
import {Subtitle} from "@/app/ui";

export const Roles = () => {
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>();
  const [isDelay, setIsDelay] = useState(true);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleDeleteUser = async (user: User) => {
    // if (!article.id) return;
    //
    // const res: ResponseDeleteArticle =  await deleteArticle({ article_id: article.id });
    //
    // if (res.success) {
    //   setArticles(prev => prev?.filter(_article => _article.id !== article.id));
    //   message.success('Статья успешно удалена!');
    // } else {
    //   message.error(`${res.message}`);
    // }
  }

  const handleAssignRole = async (role: string, user_id: number) => {
    const res = await assignRole({role, user_id})
    console.log(res)
    if (res?.success) {
      message.success('Роль успешно назначена!');
    } else {
      message.error(`${res?.message}`);
    }
  }

  const columns: TableProps<User>['columns'] = [
    {
      width: 150,
      title: 'ID пользователя',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text) => <Typography.Title level={5}>{text}</Typography.Title>,
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Назначение роли',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, user) => (
        <Segmented
          options={[
            { value: 'user', label: 'Пользователь', className: styles.user },
            { value: 'moderator', label: 'Модератор', className: styles.moderator },
            { value: 'admin', label: 'Администратор', className: styles.admin },
          ]}
          size="middle"
          defaultValue={text}
          onChange={role => handleAssignRole(role, user.id)}
        />
      ),
    },
    {
      title: 'Удалить',
      key: 'edit',
      align: 'center',
      render: (_, record) => (
        <Tooltip title={"Удалить пользователя"}>
          <Popconfirm
            title="Удаление пользователя"
            description={<>Вы действительно хотите <br/> удалить пользователя?</>}
            onConfirm={() => handleDeleteUser(record)}
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
        isFetchingUser && !user?.id ?
          <Loader/> :
          <div className={styles.list}>
            {
              users?.length ?
                <Flex vertical>
                  <Flex justify={"space-between"} align={"center"}>
                    <Subtitle className={styles.title}>Пользователи и их роли</Subtitle>
                    {/*<Link href={'/create'}>*/}
                    {/*  <Tooltip title={"Создать статью"} placement={"left"}>*/}
                    {/*    <Button type={"primary"} shape={"circle"} icon={<PlusOutlined />} />*/}
                    {/*  </Tooltip>*/}
                    {/*</Link>*/}
                  </Flex>
                  <Divider/>
                  <Table
                    columns={columns}
                    dataSource={users}
                    scroll={{ x: 100 }}
                    pagination={{ defaultPageSize: 10, position: ["bottomCenter"] }}
                  />
                </Flex> :
                <Empty className={styles.empty} description={"Пользователи не найдены"} />
            }
          </div>
      }
    </>
  );
};