const storage = function () {
    const appKey = "kid_HJMS6dTGH";
    const appSecret = "05a49ebb28d74e70b2c181d8a9d7d792";

    const getData = function (key) {
        return localStorage.getItem(key + appKey);
    };

    const saveData = function (key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    const saveUser = function (data) {
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);
    };

    const deleteUser = function () {
        localStorage.removeItem("userInfo" + appKey);
        localStorage.removeItem("authToken" + appKey);
    };

    return {
        getData,
        saveData,
        saveUser,
        deleteUser,
        appKey,
        appSecret
    }
}();