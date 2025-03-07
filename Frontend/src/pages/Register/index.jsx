import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);


  const onSubmit = (data) => {
    setLoading(true);

    fetch('http://localhost:8001/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    }).then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.success) {  // Ensure response contains success flag
          toast.success('Account created successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          });
          // Redirect to login after showing toast
          setTimeout(() => {
            navigate('/login');
          }, 2000);

        } else {
          toast.error(result.error || "Registration failed!");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        toast.error("Something went wrong! Please try again.");
      });
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative mt-[-25vh]">
        <div className="absolute inset-0 transition duration-300 animate-pink blur gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
          <h5 className="text-3xl">Register</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-200">Name
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>

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
            <Button size="large">{loading ? "loading" : "Register"}</Button>
          </form>

          {/* Login Redirect */}
          <p className="text-gray-400 mt-4 text-center">
            Already have an account?
            <Link to="/login" className="text-yellow-500 hover:underline"> Login</Link>
          </p>

          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Register;