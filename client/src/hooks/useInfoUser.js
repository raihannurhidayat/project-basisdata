export const useInfoUser = () => {
  const infoUser = JSON.parse(localStorage.getItem("userinfo"));
  return infoUser;
};

export const useInfoRole = () => {
  const infoRole = JSON.parse(localStorage.getItem("role"))
  return infoRole
}
