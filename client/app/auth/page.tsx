"use client"

import {useState} from 'react';
import {Button, Form, Input, message, Tabs, Upload, UploadFile} from 'antd';
import styles from "./auth.module.scss";
import {login, registration, User} from "./api";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Loader} from "@/app/ui/loader";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "@/app/lib/features/user/userSlice";
import {useRouter} from 'next/navigation'
import {useAuth} from "@/app/lib/hooks/useAuth";
import {UploadChangeParam} from "antd/es/upload";

const {TabPane} = Tabs;

export default function Auth() {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()


  const {user, isFetching: isFetchingUser} = useAuth();

  if (user?.id) {
    dispatch(setUser(user));
    router.push('/profile', {scroll: false})
  }

  const handleRegistration = async () => {
    const res = await registration({username, password});

    if (res.success) {
      message.success('Регистрация прошла успешно!');
      await handleLogin();
    } else {
      message.error(`${res.message}`);
    }
  };

  const handleLogin = async () => {
    const res = await login({username, password});

    if (res.success) {
      window.localStorage.setItem('token', res.data?.token || "");
      router.push('/profile', {scroll: false})
    } else {
      message.error(`${res.message}`);
    }
  };

  return (
    <>
      {
        isFetchingUser || user?.id ?
          <Loader/> :
          <main className={clsx(styles.main_container)}>
            <div className={styles.container}>
              <div className={styles.formWrapper}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Вход" key="1">
                    <Form
                      onFinish={handleLogin}
                      layout="vertical"
                    >
                      <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[{required: true, message: 'Пожалуйста, введите ваше имя пользователя!'}]}
                      >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                      </Form.Item>
                      <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}
                      >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">Войти</Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="Регистрация" key="2">
                    <Form
                      onFinish={handleRegistration}
                      layout="vertical"
                    >
                      <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[{required: true, message: 'Пожалуйста, введите ваше имя пользователя!'}]}
                      >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                      </Form.Item>
                      <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}
                      >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="Подтвердите пароль"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Пожалуйста, подтвердите введите ваш пароль!',
                          },
                          ({getFieldValue}) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password/>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </main>
      }
    </>
  );
}
