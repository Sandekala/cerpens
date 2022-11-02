const currentUser = () => {
  const user = localStorage.getItem('token');
  return user;
};
export default currentUser;
