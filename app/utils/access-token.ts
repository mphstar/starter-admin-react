const MyAccessToken = {
  get: () => {
    return localStorage.getItem("accessToken");
  },

  set: (token: string) => {
    localStorage.setItem("accessToken", token);
  },

  remove: () => {
    localStorage.removeItem("accessToken");
  },
};
export default MyAccessToken;
