import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
// login
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER);
  const [formData, setFormData] = useState({
    name: "jane doe",
    email: "janedoe@gmail.com",
    password: "password",
  });

  const { email, password, name } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: {
          registerUserInput: {
            name,
            email,
            password,
          },
        },
      });

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }

    console.log({ email, password });
  };

  return (
    <div>
      <h1 className="heading">Register</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
