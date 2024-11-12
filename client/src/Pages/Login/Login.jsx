import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
// login
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const [formData, setFormData] = useState({
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });

      localStorage.setItem("user", JSON.stringify(data.loginUser));
      dispatch(loginSuccess(data.loginUser));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }

    console.log({ email, password });
  };

  return (
    <div>
      <h1 className="heading">Login</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
