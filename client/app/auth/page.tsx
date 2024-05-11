"use client"

import {useState} from 'react';
import {Button, Form, Input, message, Tabs, Upload} from 'antd';
import styles from "./auth.module.scss";
import {login, registration} from "./api";
// import {useNavigate} from 'react-router-dom';
// import {useAuth} from "@/components/hooks/useAuth.js";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Loader} from "@/app/ui/loader";
import clsx from "clsx";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const {TabPane} = Tabs;

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const {user, isFetching: isFetchingUser} = useAuth();

  // const navigate = useNavigate();

  // if (user) {
  //   navigate("/dashboard");
  // }

  const handleRegistration = async () => {
    const res = await registration(username, password, imageUrl);

    if (res.success) {
      message.success('Регистрация прошла успешно!');
      await handleLogin();
    } else {
      message.error(`${res.message}`);
    }
  };

  const handleLogin = async () => {
    const res = await login(username, password);

    if (res.success) {
      window.localStorage.setItem('token', res.data.token);
      navigate("/dashboard");
    } else {
      message.error(`${res.message}`);
    }
  };

  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      setLoading(false);
    }
  };
  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );

  return (
    <main className={clsx(styles.main_container)}>


  {/*<Loader/>*/}
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
                    <Form.Item
                      label="Аватар"
                      name="avatar"
                    >
                      <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://localhost:4000/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{
                          width: '100%',
                          borderRadius: "50%",
                          objectFit: 'cover',
                          height: '100%'
                        }}/> : uploadButton}
                      </Upload>
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
  );
}
