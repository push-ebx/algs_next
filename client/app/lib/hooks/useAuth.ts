import {useEffect, useState} from 'react';
import {getUser, User} from "@/app/auth/api";
import {useSelector} from "react-redux";
import { usePathname } from 'next/navigation'

export const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isFetching, setIsFetching] = useState(true);
  const savedUser = useSelector((state: {user: User}) => state.user);
  const pathname = usePathname()

  const checkUser = async () => {
    const res = await getUser();
    setUser(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    checkUser()
  }, [pathname, savedUser]);

  return {user, isFetching};
};