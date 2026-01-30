const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const getToken = () => {
    const user = getUser();
    return user?.token || null;
};

const TokenService = { setUser, getUser, removeUser, getToken };
export default TokenService;