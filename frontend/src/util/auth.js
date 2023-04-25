export const tokenLoader = () => {
    const token = localStorage.getItem('token');
    return token;
}