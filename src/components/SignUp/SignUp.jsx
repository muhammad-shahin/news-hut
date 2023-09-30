import { useContext, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase/firebase.config";
import passwordErrorChecker from "../Utility/PasswordErrorChecker";
import { AuthContext } from "../../context/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import Modal from "../Utility/Modal";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccessMessage] = useState("");
  const [imageUpload, setImageUpload] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [imageName, setImageName] = useState(null);

  //   importing context
  const { createUser } = useContext(AuthContext);

  //   handle Image Input on change
  const handleImageInput = (event) => {
    setImageUpload();
    setImageName(event.target.files[0].name);
  };

  //   handle Image Upload
  const handleImageUpload = () => {
    if (!imageUpload) return setErrorMessage("Please Chose A Picture");
    const imageRef = ref(
      storage,
      `NewsHunt/profilePicture/${imageUpload.name}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      setModalMessage(
        "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p> <p>Profile Picture Uploaded Successfully ✔️</p>"
      );
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(auth.currentUser, {
          photoURL: url,
        })
          .then(() => {
            Swal.fire({
              title: "Sign Up Complete",
              text: "Account Created & Profile Picture Updated Successfully. Now Verify Your Account To Sign In",
              icon: "success",
              confirmButtonText: "Sign In Now",
            });
            setModalMessage(
              "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p> <p>Profile Picture Uploaded Successfully ✔️</p> <p>Registration Complete ✔️</p>"
            );
            setShowModal(false);
            console.log(auth.currentUser);
          })
          .catch((error) => {
            Swal.fire({
              title: "Failed To Upload Profile Picture",
              text: "Account Created But Failed to Update The Profile Picture. You can Continue Without Profile Picture",
              icon: "error",
              confirmButtonText: "Sign In Now",
            });
            setErrorMessage(error.message);
          });
      });
    });
  };

  // handle Sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    setModalMessage("<p>Creating Your Account ⏳</p>");
    setShowModal(true);
    setSuccessMessage("");
    setErrorMessage("");
    if (password === confirmPassword) {
      createUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setModalMessage(
            "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p>"
          );
          e.target.name.value = "";
          e.target.email.value = "";
          e.target.password.value = "";
          e.target.confirmPassword.value = "";
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              setModalMessage(
                "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p>"
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          imageUpload && handleImageUpload();
        })
        .catch((error) => {
          setErrorMessage(error.message);
          Swal.fire({
            title: "Failed To Create Account",
            text: "Failed To Create Account Please Try Again. Check The Error Message For Better Understanding",
            icon: "error",
            confirmButtonText: "Sign In Now",
          });
        });
    } else {
      setShowModal(false);
      setErrorMessage("Password Didn't Match!");
    }
  };

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    if (e.target.name === "password") {
      setPasswordErrorMessage(passwordErrorChecker(e));
    } else if (e.target.name === "confirmPassword") {
      setConfirmPasswordErrorMessage(passwordErrorChecker(e));
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center w-full  flex-col">
      <form
        className="flex flex-col justify-center gap-5 my-10 w-[320px]"
        onSubmit={handleSignUp}
      >
        <h2 className="text-[22px] rounded-lg text-sky-600 font-medium">
          Crete An Account To Read All News Categories{" "}
        </h2>
        <input
          className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium"
          type="text"
          placeholder="Enter Full Name"
          name="name"
          required
        />
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
        <div className="relative">
          <input
            className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handlePasswordChange}
            required
          />
          {confirmPasswordError && (
            <p className="text-red-600 text-[12px] text-center">
              {confirmPasswordError}
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

        <div className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium bg-transparent hover:bg-sky-300 duration-700 flex flex-col justify-center items-center">
          <label className="cursor-pointer" htmlFor="profileImg">
            Upload Profile Picture
          </label>
          <input
            className="hidden"
            type="file"
            name="photoInput"
            id="profileImg"
            accept=".png, .jpg, .jpeg, .gif, .webp"
            onChange={handleImageInput}
          />
          {imageName && (
            <p className=" text-green-600 text-[14px] text-center">
              {imageName}
            </p>
          )}
        </div>
        <input
          className="text-[22px] outline-none border-2 border-sky-500 px-5 py-2 rounded-lg text-sky-600 font-medium bg-sky-300 cursor-pointer hover:bg-transparent duration-700"
          type="submit"
          value="Sign Up"
        />
        {errorMessage && (
          <p className="text-red-600 font-medium text-[18px] text-center mt-4">
            {errorMessage}
          </p>
        )}
        {success && (
          <p className="text-green-600 font-medium text-[18px] text-center mt-4">
            {success}
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
        <button className="text-[22px] outline-none border-2 border-gray-300 px-5 py-2 rounded-full bg-white font-medium text-sky-600 flex justify-center items-center gap-3">
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

export default SignUp;
