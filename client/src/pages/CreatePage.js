import { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext.";
import { useNavigate } from "react-router-dom";
export const CreatePage = () => {
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const history = useNavigate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        console.log(data);
        history(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Input link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
          <label htmlFor="link">Input link</label>
        </div>
      </div>
    </div>
  );
};
