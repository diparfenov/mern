import { useCallback } from "react";

//хук для всплывающей ошибки
//toast это метод MaterializeUI
export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};
