import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    fetch("http://localhost:8001/api/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Login successful!");

          // Store user login status in localStorage
          localStorage.setItem("isLoggedIn", "true");

          // Redirect to home page and refresh the header
          navigate("/");
          window.location.reload();
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  };


  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative mt-[-20vh]">
        <div className="absolute inset-0 transition duration-300 animate-pink blur gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full bg-black">
          <h5 className="text-3xl">Login</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-200">Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-200">Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <Button size="large">{loading ? "loading" : "Login"}</Button>
          </form>

          <p className="text-gray-400 mt-4 text-center">
            Don't have an account?
            <Link to="/register" className="text-yellow-500 hover:underline"> Register</Link>
          </p>

          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Login;