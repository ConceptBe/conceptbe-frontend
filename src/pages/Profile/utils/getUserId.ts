export const getUserId = () => JSON.parse(localStorage.getItem('user') ?? '{}').id;
