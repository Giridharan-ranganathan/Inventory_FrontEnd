// import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("https://inventory-backend-2-z7y5.onrender.com/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
          // authContext.signin(data._id, () => {
          //   alert("innnn");
          //   navigate("/");
          // });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again")
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    // Cannot send empty data
    if (form.email === "" || form.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      fetch("https://inventory-backend-2-z7y5.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((result) => {
          console.log("User login", result);
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        });
    }
    authCheck();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  
  return (
    <>
      <div className="grid items-center place-items-center flex justify-center">
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={loginUser}
              >
                Sign in
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't Have an Account, Please{" "}
                  <Link to="/register"> "Register Now"</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
