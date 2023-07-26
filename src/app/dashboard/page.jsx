'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/slices/authSlice';
import LogOutButton from '../components/UI/logOutButton';

// eslint-disable-next-line react/prop-types
export default function Dashboard() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch('/api/auth/currentUser');
      const user = await res.json();

      if (res.ok) {
        dispatch(logIn(user));
      }
    };
    loadUser();
  }, [dispatch]);
  return (
    <div>
      Dashboard -
      {' '}
      {userAuth && userAuth.nombre}
      <LogOutButton />
    </div>
  );
}
