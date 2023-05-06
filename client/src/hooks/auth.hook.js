//когда мы получаем JWT токен мы храним его в локал сторадж
//то есть, если мы перезагрузим страницу а в локал сторадже
//будет находиться валидный токен, то мы его сразу используем

import { useCallback, useEffect, useState } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    //получаем с сервера токен и id
    setToken(jwtToken);
    setUserId(id);
    //записываем его в локальное хранилище бразера преобразуем их в строку
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    //все чистим
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  //делаем так, что если в локалсторадже есть уже данные
  //о токене и айди, он их автоматически оттуда брал
  useEffect(() => {
    //преобразуем в объект
    const data = JSON.parse(localStorage.getItem(storageName));

    //если что-то пришло и там есть токен
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
