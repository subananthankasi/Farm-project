import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../Assets/favicon.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ForgetPassword.css'
import forgotLogo from '../Assets/forgot.png'
import { forgotThunk } from "../Redux/Thunk/ForgotThunk";
import { toast, Bounce } from "react-toastify";
const ForgetPassword = () => {
       const dispatch = useDispatch()
       const navigate = useNavigate()
    const initialValues = {
        userNameOrEmail: "",
    };
    const validationSchema = yup.object().shape({
        userNameOrEmail: yup.string().email('Please Enter Valid Email').required("*required!!"),
       
    });

    const onSubmit = async (values) => {
        try {
            const resultAction = await dispatch(forgotThunk(values));
            // console.log("resultAction", resultAction);

            if (forgotThunk.fulfilled.match(resultAction)) {
                const logintoast = resultAction.payload.data
                // console.log('logintoast', logintoast)
                navigate("/");
                setTimeout(() => {
                    toast.success('Password sent successfully.', {
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
            else if (forgotThunk.rejected.match(resultAction)) {
                const errorPayload = resultAction.payload.error.reason;
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


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
   

    return (
        <div className="Container forgetContainer">
            <form onSubmit={formik.handleSubmit}>
                <div className="forgetBox mt-2">
                    <div style={{ textAlign: "center" }}>
                        <img src={forgotLogo} alt="LoginImg" />
                    </div>
                    <div className="mt-4 title">
                        <h5>Forgot Password</h5>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" style={{fontWeight:'400',fontSize:'15px'}}>Email <span style={{color:'red'}}>*</span> </label>
                        <input
                            type="email"
                            name="userNameOrEmail"
                            placeholder="Email"
                            value={formik.values.userNameOrEmail}
                            className="form-control mt-2 forgetInput"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.userNameOrEmail && formik.touched.userNameOrEmail ? (
                        <p style={{ color: "red",fontSize:'12px' }}>{formik.errors.userNameOrEmail}</p>
                    ) : null}
                   
                    <div className="mt-4 ">
                        <button type="submit" className="w-100 fogetButton">
                            Submit
                        </button>
                    </div>
                    <div className="mt-3">
                        <Link to={'/'} style={{textDecoration:'none',color:'black'}}> <p style={{ textAlign: "center" }}> <span style={{fontSize:'18px',fontWeight:'500'}}> {"<"}  </span> Back to LogIn </p>  </Link>
                    </div>
                    <div className="mt-3" style={{ textAlign: "center", color: "gray" }}>
                        <p>© Ebrain Technologies</p>
                    </div>
                </div>
            </form>
        </div>


    );
};

export default ForgetPassword;