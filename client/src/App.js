import "materialize-css";

import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext.";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

function App() {
  //все параметры useAuth мы должны передвать всему приложннию
  //для этого будем использовать контекст
  const { token, userId, login, logout, ready } = useAuth();
  //приведение токен к bool, то есть если он есть то авторизован
  const isAuthnticated = !!token;
  const routes = useRoutes(isAuthnticated);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthnticated }}
    >
      <Router>
        {isAuthnticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
