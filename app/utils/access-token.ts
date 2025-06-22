const MyAccessToken = {
  get: () => {
    return localStorage.getItem("accessToken") || '1|kWoI8iugnx6gfMBxqRWumlWAfiidzU4DuxfCiq6ua2200177';
  },

  set: (token: string) => {
    localStorage.setItem("accessToken", token);
  },

  remove: () => {
    localStorage.removeItem("accessToken");
  },
};
export default MyAccessToken;
