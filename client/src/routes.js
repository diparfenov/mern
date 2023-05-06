import { Route, Routes } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

//в зависимости от того, зарегистрирован пользователь или нет
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path="/links" element={<LinksPage />} exact />
          <Route path="/create" element={<CreatePage />} exact />
          <Route path="/detail/:id" element={<DetailPage />} exact />
          <Route path="*" element={<CreatePage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </>
  ); //<Navigate to="/" />
};
