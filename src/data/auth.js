

const USERS = [
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
  { email: "user@gmail.com", password: "user123", role: "user" },
];

export const login = (email, password) => {
  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return null;

  localStorage.setItem(
    "auth",
    JSON.stringify({ isAuth: true, role: user.role })
  );

  return user.role;
};

export const logout = () => {
  localStorage.removeItem("auth");
};
export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};

// export const getAuth = () => {
//   const auth = localStorage.getItem("auth");
//   return auth ? JSON.parse(auth) : null;
// };
