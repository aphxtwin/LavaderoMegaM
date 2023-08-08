import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '../redux/slices/authSlice';

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logOut', { method: 'POST' });
    if (res.ok) {
      dispatch(logOut());
      router.replace('/');
    }
  };

  return handleLogout;
}
