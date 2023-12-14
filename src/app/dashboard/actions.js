export default async function loadUser() {
  const res = await fetch('http://localhost:3000/api/auth/currentUser');
  const user = await res.json();
  return user;
}
