import { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext.";

export const AuthPage = () => {
  //в этом объекте есть все данные, которые мы передаем в провайдера
  //то есть в auth есть login и logout
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        ...form,
      });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        ...form,
      });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Input email"
                  id="email"
                  type="text"
                  name="email"
                  className="orange-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name="password"
                  className="orange-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 blsck-text"
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
