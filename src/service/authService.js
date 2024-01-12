import {jwtDecode} from "jwt-decode";

export const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('Authorization', accessToken);
    localStorage.setItem('Refresh-Token', refreshToken);
};

export const getTokens = () => {
    // these contain the prefix "Bearer "
    const fullAuthToken = localStorage.getItem('Authorization');
    const fullRefreshToken = localStorage.getItem('Refresh-Token');

    // variables to store tokens after removing prefix "Bearer "
    let accessToken = null;
    let refreshToken = null;

    if (fullAuthToken && fullAuthToken.startsWith('Bearer ')) {
        accessToken = fullAuthToken.substring('Bearer '.length);
    }

    if (fullRefreshToken && fullRefreshToken.startsWith('Bearer ')) {
        refreshToken = fullRefreshToken.substring('Bearer '.length);
    }

    return { accessToken, refreshToken };
};

export const removeTokens = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh-Token');
};

export const handleLogout = () => {
    removeTokens();
}
export const isLoggedIn = () => {
    const accessToken = getTokens().accessToken;

    if (accessToken) {
        const decodedAuthToken = jwtDecode(accessToken);
        return decodedAuthToken.exp * 1000 > Date.now();
    }

    return false;
}
