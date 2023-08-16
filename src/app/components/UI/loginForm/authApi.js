// eslint-disable-next-line import/prefer-default-export
export const authenticateUser = async (username, password) => {
  const trimmedUsername = username.trim();
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: trimmedUsername,
      password,
    }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true, user: data.user };
  }
  return { success: false, errors: data };
};
