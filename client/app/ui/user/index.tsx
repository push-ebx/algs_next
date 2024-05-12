"use client"

import {Avatar, Button, Dropdown, Flex, Skeleton, Tag} from 'antd';
import {useAuth} from "@/app/lib/hooks/useAuth";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setUser} from "@/app/lib/features/user/userSlice";
import {LoginOutlined} from "@ant-design/icons";

const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

export const User = () => {
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const items = [
    {
      key: '1',
      label: (
        <Link href={"/profile"}>Личный кабинет</Link>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => {
          window.localStorage.setItem('token', '');
          dispatch(setUser({id: null, username: "", token: "", role: ""}));
          router.push(`/auth`, { scroll: false });
        }}>
          Выйти
        </a>
      ),
    }
  ];

  const roles = {
    user: { color: "blue", title: "Пользователь" },
    moderator: { color: "gold", title: "Модератор" },
    admin: { color: "green", title: "Администратор" }
  };

  return (
    <Flex align={"center"}>
      <Flex style={{position: "absolute", left: "2rem"}}>
        {
          user?.role ?
            <Tag color={roles[user?.role].color}>
              {roles[user?.role].title}
            </Tag> :
            <Skeleton.Input active/>
        }
      </Flex>
      {
        isFetchingUser ?
          <Skeleton.Input active/> :
          !user?.id ?
            <Link href={"/auth"}> <Button>Войти <LoginOutlined /></Button> </Link> :
            <Flex style={{cursor: "pointer"}}>
              <Dropdown menu={{items}}>
                <Flex align={"center"} gap={15}>
                  <Avatar
                    style={{
                      backgroundColor: stringToColour(user.username)
                    }}
                    // src={user.avatar_url}
                  >
                    {user.username[0]}
                  </Avatar>
                  <p style={{fontSize: 16}}>{user.username}</p>
                </Flex>
              </Dropdown>
            </Flex>
      }
    </Flex>
  );
};