import { useContext, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import passwordErrorChecker from "../Utility/PasswordErrorChecker";
import { AuthContext } from "../../context/AuthContextProvider";
import Swal from "sweetalert2";
import Modal from "../Utility/Modal";
import firebaseAuthError from "../Utility/FirebaseError";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  //   importing context
  const { loginUser, signInWithGoogle } = useContext(AuthContext);

  // handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setModalMessage("<p>Login To Your Account ⏳</p>");
    setShowModal(true);
    setErrorMessage("");
    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          setModalMessage(
            "<p>Login To Your Account ⏳</p> <p>Login Successfully ✔️</p>"
          );
          setShowModal(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Logged In With Email & Password",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          setShowModal(false);
          setModalMessage(
            "<p>Login To Your Account ⏳</p> <p>Email Not Verified ❌</p>"
          );
          Swal.fire({
            title: "Email not Verified",
            text: "Please verify your email to login. A verification email is already being sent to tour email address. If Not found send verification link again by clicking below. Also check your spam folder if not found.",
            icon: "error",
            confirmButtonText: "Send Verification Link",
          }).then((result) => {
            if (result.isConfirmed) {
              sendEmailVerification(auth.currentUser).then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title:
                    "A New Verification Email is Sent to Your Email Address. Please Check Your Email.",
                  showConfirmButton: false,
                  timer: 3500,
                });
              });
            }
          });
        }

        e.target.email.value = "";
        e.target.password.value = "";
      })
      .catch((error) => {
        setModalMessage(
          "<p>Login To Your Account ⏳</p> <p>Failed To Login ❌</p>"
        );
        setShowModal(false);
        firebaseAuthError(error.message);
      });
  };

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    if (e.target.name === "password") {
      setPasswordErrorMessage(passwordErrorChecker(e));
    }
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Signed In With Google",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        firebaseAuthError(error.message);
      });
  };
  return (
    <section className="container mx-auto flex justify-center items-center w-full h-[80vh]  flex-col">
      <form
        className="flex flex-col justify-center gap-5 my-10 w-[320px]"
        onSubmit={handleLogin}
      >
        <h2 className="text-[22px] rounded-lg text-sky-600 font-medium">
          Login To Your Account
        </h2>

        <input
          className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium"
          type="email"
          placeholder="Enter Your Email"
          name="email"
          required
        />
        <div className="relative">
          <input
            className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
            <p className="text-red-600 text-[12px] text-center">
              {passwordError}
            </p>
          )}
          {showPassword ? (
            <AiFillEyeInvisible
              className="absolute top-[25%] right-[5%] text-gray-600 text-[24px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <AiFillEye
              className="absolute top-[25%] right-[5%] text-gray-600 text-[24px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <input
          className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium bg-sky-300 cursor-pointer hover:bg-transparent duration-700"
          type="submit"
          value="Login"
        />
        {errorMessage && (
          <p className="text-red-600 font-medium text-[18px] text-center mt-4">
            {errorMessage}
          </p>
        )}
      </form>

      {/* horizontal row */}
      <div className="w-[300px] flex justify-center items-center gap-3 mb-4">
        <hr className="w-full h-[2px] bg-gray-300" />
        <span className="text-gray-600 font-medium">Or</span>
        <hr className="w-full h-[2px] bg-gray-300" />
      </div>

      {/* sign in with google section */}
      <div>
        <button
          className="text-[22px] outline-none border-2 border-gray-300 px-5 py-2 rounded-full bg-white font-medium text-sky-600 flex justify-center items-center gap-3"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-[26px]" />
          Continue With Google
        </button>
      </div>

      <Modal
        title="Creating Account"
        message={modalMessage}
        modalStatus={showModal}
      ></Modal>
    </section>
  );
};

export default Login;
