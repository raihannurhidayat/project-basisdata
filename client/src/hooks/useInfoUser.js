export const useInfoUser = () => {
  const infoUser = JSON.parse(localStorage.getItem("userinfo"));
  return infoUser;
};
