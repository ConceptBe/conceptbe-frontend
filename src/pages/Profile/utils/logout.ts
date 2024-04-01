const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userToken');
  window.location.reload();
};

export default logout;
