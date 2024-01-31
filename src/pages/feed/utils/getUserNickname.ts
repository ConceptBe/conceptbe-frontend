export const getUserNickname = (): string => {
  const userItem = localStorage.getItem('user');
  const userToken = localStorage.getItem('userToken');

  if (userItem && userToken) {
    const user: { id: number; nickname: string; profileImageUrl: string } = JSON.parse(userItem);
    return user.nickname;
  }

  return 'Guest1234';
};
