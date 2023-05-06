import "materialize-css";

import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";

function App() {
  //все параметры useAuth мы должны передвать всему приложннию
  //для этого будем использовать контекст
  const { token, userId, login, logout } = useAuth();
  const routes = useRoutes(false);
  return (
    <Router>
      <div className="container">{routes}</div>
    </Router>
  );
}

export default App;
