export const setLocalStorage = (key: string, value: any, days: number) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    const item = {
        value: value,
        expires: expires.getTime()
    };

    localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expires) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

export const removeLocalStorage = (key: string) => {

    localStorage.removeItem(key);

};
