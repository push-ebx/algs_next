import styles from './styles.module.scss'
import {useAuth} from "@/app/lib/hooks/useAuth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Article, ResponseDeleteArticle, User} from "@/app/lib/types";
import {assignRole, deleteUser, getArticles, getUsers} from "@/app/profile/api";
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
import {DeleteOutlined} from "@ant-design/icons";
import {Loader} from "@/app/ui/loader";
import {Subtitle} from "@/app/ui";

export const Roles = () => {
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>();
  const [isDelay, setIsDelay] = useState(true);

  useEffect(() => {
    getUsers().then(setUsers);

    setTimeout(() => {
      setIsDelay(false);
    }, 500);
  }, []);

  const handleDeleteUser = async ({user_id}: {user_id: number}) => {
    if (!user_id) return;
    const res: ResponseDeleteArticle =  await deleteUser({ user_id });

    if (res.success) {
      setUsers(prev => prev?.filter(user => user.id !== user_id));
      message.success(res.message);
    } else {
      message.error(`${res.message}`);
    }
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
            onConfirm={() => handleDeleteUser({user_id: record.id})}
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