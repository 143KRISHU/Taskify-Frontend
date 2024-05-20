import React, { useState, useEffect } from 'react'
import signUpGif from "../assets/login-nobg-2.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import backendRoutesAPI from "../BackendAPiEndPoints/Api.js";
import { toast } from 'react-toastify';
import LoaderTwo from '../Component/SecondLoader/LoaderTwo.jsx';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '', username: '', password: '', confirmPassword: '', fullname: ''
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRegistering, setIsRegistring] = useState(false)
  const navigate = useNavigate();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    const validUsername = /^[0-9A-Za-z]{6,16}$/;
    const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/

    if (!values.fullname) { errors.fullname = 'Full Name is required' }

    if (!values.email) { errors.email = "Email is Required" }
    else if (!values.email.includes('gmail') && !values.email.includes('yahoo')) { errors.email = "Enter a valid Email" }

    if (!values.username) { errors.username = "UserName is required" }
    else if (!validUsername.test(values.username)) { errors.username = "Inavlid Username - username can't have special character and should be alphanumeric " }
    else if (values.username.length > 16) { errors.username = "Username can not exceeds 10 character" }
    else if (values.username.length < 8) { errors.username = "UserName must have atleast 8 character" }

    if (!values.password) { errors.password = 'Password is required' }
    else if (!isStrongPassword.test(values.password)) { errors.password = 'Password must contain at least one each of a number, uppercase letter, lowercase letter, and non-alphanumeric and length of password should be of 8 character' }
    else if (values.password.length < 4) { errors.password = "Password should be atleast of 4 character" }
    else if (values.password.length > 10) { errors.password = "Password should not exceeds 10 character" }

    if (!values.confirmPassword) { errors.confirmPassword = 'Confirm Password is required' }
    else if (values.confirmPassword.length < 4) { errors.confirmPassword = "Confirm Password  should be atleast of 4 character" }
    else if (values.confirmPassword.length > 10) { errors.confirmPassword = "Confirm Password  should not exceeds 10 character" }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password and Password should be Same'
      errors.confirmPassword = 'Confirm Password and Password should be Same'
    }
    return errors
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(validate(formData));
    setIsSubmit(true);
  }

  const registernNewCustomer = async () => {
    try {
      const backendAPIResponse = await fetch(backendRoutesAPI.signup.url, {
        method: backendRoutesAPI.signup.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const finalData = await backendAPIResponse.json();
      if (finalData.success) {
        toast.success(finalData.message)
        navigate("/log-in")
      }
      else {
        if (finalData.message.includes("Customer is already exist with the same email or username")) {
          toast.error(finalData.message);
          navigate("/log-in");
        }
        else {
          toast.error(finalData.message)
          setIsSubmit(false)
          navigate("/sign-up")
        }

      }
    } catch (error) {
      toast.error("Signup Error Server is not responding ");
    }
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      setIsRegistring(true)
      registernNewCustomer()
    }
  }, [formError])

  return (
    <>
      {
        isRegistering ? <LoaderTwo /> :
          <section id="signup">
            <div className="container mx-auto flex flex-col justify-center items-center p-4 h-full">
              <div className='text-center text-5xl mb-10'>
                <h1>Manage Your Task - <b><u>Taskify</u></b></h1>
              </div>
              <div className='p-6 w-full max-w-3xl mx-auto rounded-2xl shadow-2xl' style={{ backgroundColor: "#fff" }}>
                <div className="gif w-20 h-20 mx-auto mb-2">
                  <img src={signUpGif} alt='sigupGif' />
                </div>
                <hr className='mb-4'></hr>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                  <div className="grid credentials mb-4">
                    <label className="text-xl" htmlFor='email'>Your Full Name * :&nbsp;&nbsp;  </label>
                    <div className='bg-slate-100 p-2'>
                      <input type='text' id='fullname' placeholder='Enter Your Full Name'
                        className='w-full h-full outline-none bg-transparent' value={formData.fullname}
                        onChange={handleChnage} name='fullname' />
                    </div>
                    <p className='text-red-600 px-2'>{formError.fullname}</p>
                  </div>
                  <div className="grid credentials mb-4">
                    <label className="text-xl" htmlFor='email'>Email Id * :&nbsp;&nbsp;  </label>
                    <div className='bg-slate-100 p-2'>
                      <input type='email' id='email' placeholder='example@gmail.com'
                        className='w-full h-full outline-none bg-transparent' value={formData.email}
                        onChange={handleChnage} name='email' />
                    </div>
                    <p className='text-red-600 px-2'>{formError.email}</p>
                  </div>
                  <div className="grid credentials mb-4 ">
                    <label className="text-xl" htmlFor='email'>UserName * :&nbsp;&nbsp;  </label>
                    <div className='bg-slate-100 p-2'>
                      <input type='text' id='username' placeholder='example@123'
                        className='w-full h-full outline-none bg-transparent' value={formData.username}
                        onChange={handleChnage} name='username' />
                    </div>
                    <p className='text-red-600 px-2'>{formError.username}</p>
                  </div>
                  <div className=" grid credentials mb-4">
                    <label className="text-xl" htmlFor='password'>Password * :&nbsp; &nbsp;  </label>
                    <div className='bg-slate-100 p-2 flex items-center'>
                      <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Your Password'
                        className='w-full h-full outline-none bg-transparent' value={formData.password}
                        onChange={handleChnage} name='password' />
                      <div onClick={() => setShowPassword((prevState) => !prevState)}
                        className='cursor-pointer text-xl'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <p className='text-red-600 px-2'>{formError.password}</p>
                  </div>
                  <div className=" grid credentials mb-4">
                    <label className="text-xl" htmlFor='password'>Confirm Password * :&nbsp; &nbsp;  </label>
                    <div className='bg-slate-100 p-2 flex items-center'>
                      <input type={showConfirmPassword ? 'text' : 'password'} id='confirmpassword' placeholder='Same as Password'
                        className='w-full h-full outline-none bg-transparent' value={formData.confirmPassword}
                        onChange={handleChnage} name='confirmPassword' />
                      <div onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                        className='cursor-pointer text-xl'>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <p className='text-red-600 px-2'>{formError.confirmPassword}</p>
                  </div>
                  <button className="credential-btn mt-4 px-5 py-2 rounded-full w-full 
                            max-w-[170px] hover:scale-110 transition-all text-lg block mx-auto"
                    style={{ backgroundColor: "#ffddd2", border: "2px solid black" }} type='submit'>Sign Up</button>
                </form>
                <p className='mt-5 text-sm w-full '>
                  Already have Account ? <Link to={"/log-in"} className="hover:underline" style={{ color: "blue" }}>Login</Link>
                </p>
              </div>
            </div>
          </section>
      }

    </>

  )
}

export default SignUp

