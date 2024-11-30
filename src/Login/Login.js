import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../Assets/favicon.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginThunk } from "../Redux/Thunk/LoginThunk";
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const initialValues = {
        userName: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        userName: yup.string().required("*required!!"),
        password: yup.string().required("*required!!"),
    });


    const onSubmit = async (values) => {


        try {
            const resultAction = await dispatch(LoginThunk(values));
            // console.log("resultAction", resultAction);

            if (LoginThunk.fulfilled.match(resultAction)) {
                const logintoast = resultAction.payload.data.message
                // console.log('logintoast', logintoast)
                navigate("/country");
                setTimeout(() => {
                    toast.success(logintoast, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }, 1000)

            }
            else if (LoginThunk.rejected.match(resultAction)) {
                const errorPayload = resultAction.payload.error.message;
                // console.log("errorPayload", errorPayload);
                toast.error(errorPayload, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error("Check Your NetWork Connection", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };



    const data = useSelector((state) => state.loginData);
    // console.log("data", data);

    const role = data?.data;
    // console.log("role", role);

    const data1 = role?.data;
    // console.log("data1", data1);

    const form_Token = data1?.jwt;
    // console.log("form_Token", form_Token);

    const loginLoading = useSelector((state) => state.loginData.loading);
    console.log('loginLoading', loginLoading)


    useEffect(() => {
        if (form_Token) {
            localStorage.setItem("form_Token", form_Token);
        } else {
            return;
        }
    }, [form_Token]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    const overlayStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    };

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",

    };


    return (
        <div className="Container loginContainer">


            
         
            
         
                    <form onSubmit={formik.handleSubmit} autoComplete="off">

                    <div className="box mt-2">
                        <div style={{ textAlign: "center" }}>
                            <img src={logo} alt="LoginImg" />
                        </div>
                        <div className="mt-4 title">
                            <h5>Log In</h5>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="userName" style={{ fontWeight: '400', fontSize: '15px' }}>User Name <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="User Name"
                                value={formik.values.userName}
                                className="form-control mt-2 loginInput"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.userName && formik.touched.userName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.userName}</p>
                        ) : null}
                        <div className="input-box mt-3">
                            <label htmlFor="password" style={{ fontWeight: '400', fontSize: '15px' }}>Password <span style={{ color: 'red' }}>*</span></label>
                            <div className="password-wrapper mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="form-control loginInput"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.password}</p>
                            ) : null}
                        </div>
                        <div className="mt-3">
                            <Link to={'/forgetPassword'} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }} > <p style={{ textAlign: "right" }}>Forgot Password ?</p>  </Link>
                        </div>
                        <div className="mt-3 ">
                            <button type="submit" className="w-100 loginButton">
                                Log In
                            </button>
                            {
                                loginLoading && (
                                    <div style={overlayStyle}>
                                    <div style={{ textAlign: "center" }}>
                                        <BeatLoader
                                            loading={loginLoading}
                                            cssOverride={override}
                                            size={30}
                                            color={"#f8f9fa"}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                </div>
                                )
                            }
                        </div>
                        <div className="mt-3" style={{ textAlign: "center", color: "gray" }}>
                            <p>© Ebrain Technologies</p>
                        </div>
                    </div>
                </form>
       
         
        </div>
    );
};

export default Login;