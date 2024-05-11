import {useEffect, useState} from 'react';
import {getUser} from "@/app/auth/api";
import {useSelector} from "react-redux";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const savedUser = useSelector((state) => state.user);

  const checkUser = async () => {
    if (savedUser.username) {
      setUser(savedUser);
      return;
    }

    const res = await getUser();
    setUser(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return {user, isFetching};
};