import React, { useEffect, useState } from "react";
import "./profile.css";
import profileLogo from "../../../Assets/android-profile-icon-2.jpg";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast, ToastContainer, Bounce } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../../Redux/Thunk/MasterThunk/User/UserFetchThunk";
import { userProfileGet } from "../../../Redux/Thunk/MasterThunk/Profile/UserDetailGetThunk";
import { userProfileFetch } from "../../../Redux/Thunk/MasterThunk/Profile/UserGetIdThunk";
import { userProfileUpdate } from "../../../Redux/Thunk/MasterThunk/Profile/UserProfileUpdateThunk";
import { userProfilePasswordUpdate } from "../../../Redux/Thunk/MasterThunk/Profile/UserPassword";
import BeatLoader from "react-spinners/BeatLoader";

const Profile = () => {
  const dispatch = useDispatch();
  const loginDatas = useSelector((state) => state.loginData);
  const login = loginDatas?.data?.data;
  const form_Token = login?.jwt;
  console.log(form_Token, "form_Token");

  // console.log(auth_token)

  useEffect(() => {
    const savedToken = localStorage.getItem("form_Token");
    console.log(savedToken);

    if (!savedToken) {
      window.location.href = "/";
    }
  }, [form_Token]);

  const handleLogout = () => {
    localStorage.removeItem("form_Token");
    window.location.href = "/";
  };
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordmodal, setPasswordmodal] = useState(false);

  const handleChangeFullname = (e) => {
    setFullName(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, fullName: "" }));
    }
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, userName: "" }));
    }
  };
  const handleChangePhoneNo = (e) => {
    setPhoneNo(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, phoneNo: "" }));
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, email: "" }));
    }
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, address: "" }));
    }
  };
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, oldPassword: "" }));
    }
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, newPassword: "" }));
    }
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, confirmPassword: "" }));
    }
  };

  const profileToastUpdate = useSelector(
    (state) => state.profileUpdate?.data?.data
  );
  console.log("profileToastUpdate", profileToastUpdate);
  const profileToastUpdateload = useSelector(
    (state) => state.profileUpdate.loading
  );
  console.log("profileToastUpdateload", profileToastUpdateload);

  const handleSubmitProfileBasic = async () => {
    console.log("rukku");
    const newError = {};
    if (!fullName) newError.fullName = "requierd";
    if (!userName) newError.userName = "required";
    // if (!phoneNo) newError.phoneNo = "required";
    // if (!email) newError.email = "required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newError.email = "Required";
    } else if (!emailRegex.test(email)) {
      newError.email = "Invalid Email Format"; // Email format validation error
    }
    if (!phoneNo) {
      newError.phoneNo = "Required";
    } else if (phoneNo.length !== 10) {
      newError.phoneNo = "Phone Number Must be 10 Digits";
    }
    if (!address) newError.address = "required";

    setError(newError);
    if (Object.keys(newError).length === 0) {
      // dispatch(userProfileUpdate({id,fullName,email,phoneNo,address,userName,userRoleId}))
      // dispatch(userProfileGet())
      try {
        const response = await dispatch(
          userProfileUpdate({
            id,
            fullName,
            email,
            phoneNo,
            address,
            userName,
            userRoleId,
          })
        );
        if (userProfileUpdate.fulfilled.match(response)) {
          const success = response.payload.data;
          console.log("success", success);
          // setopenUpdate(false)
          toast.success(success, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch(userProfileGet());
        } else if (userProfileUpdate.rejected.match(response)) {
          const errorMsgUp = response.payload.error.reason;
          console.log("errorMsgUp", errorMsgUp);

          toast.error(errorMsgUp, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(()=>{
  // if(profileToastUpdate){
  //   toast.success(profileToastUpdate, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  // });
  // }
  // },[profileToastUpdate])

  useEffect(() => {
    dispatch(userProfileGet());
  }, []);

  const userProfileDetail = useSelector(
    (state) => state.profileGet?.data?.data?.loginObj
  );
  console.log("userProfileDetail", userProfileDetail);

  useEffect(() => {
    if (userProfileDetail) {
      dispatch(userProfileFetch(userProfileDetail));
    }
  }, [userProfileDetail, dispatch]);

  const userProfilfetch = useSelector(
    (state) => state.profileFetch?.data?.data
  );
  console.log("userProfilfetch", userProfilfetch);

  useEffect(() => {
    if (userProfilfetch) {
      setFullName(userProfilfetch[0].fullName || "");
      setUserName(userProfilfetch[0].userName || "");
      setPhoneNo(userProfilfetch[0].phoneNo || "");
      setEmail(userProfilfetch[0].email || "");
      setAddress(userProfilfetch[0].address || "");
      setId(userProfilfetch[0].id || "");
      setUserRoleId(userProfilfetch[0].userRoleId || "");
    }
  }, [userProfilfetch]);

  const toastPassword = useSelector(
    (state) => state.profilePasswordUpdate?.data?.data
  );
  console.log("toastPassword", toastPassword);
  const toastPasswordEr = useSelector((state) => state.profilePasswordUpdate);
  const toastPasswordErr = toastPasswordEr?.error?.error?.reason;
  console.log("toastPasswordErr", toastPasswordErr);
  const toastPasswordload = useSelector(
    (state) => state.profilePasswordUpdate.loading
  );
  console.log("toastPasswordload", toastPasswordload);

  const handleSubmitManagePassword = async () => {
    console.log("ggggggg");
    const newError = {};
    if (!oldPassword) newError.oldPassword = "required";
    if (!newPassword) newError.newPassword = "required";
    if (!confirmPassword) {
      newError.confirmPassword = "required";
    } else if (newPassword !== confirmPassword) {
      newError.confirmPassword = "Password Did Not Match";
    }
    setError(newError);
    if (Object.keys(newError).length === 0) {
      // dispatch(userProfilePasswordUpdate({oldPassword,newPassword,confirmPassword}))
      try {
        const response = await dispatch(
          userProfilePasswordUpdate({
            oldPassword,
            newPassword,
            confirmPassword,
          })
        );
        if (userProfilePasswordUpdate.fulfilled.match(response)) {
          const success = response.payload.data;
          console.log("success", success);

          toast.success(success, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setPasswordmodal(true);
        } else if (userProfilePasswordUpdate.rejected.match(response)) {
          const errorMsgUp = response.payload.error.reason;
          console.log("errorMsgUp", errorMsgUp);

          toast.error(errorMsgUp, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    <>
      {profileToastUpdateload || toastPasswordload ? (
        <div style={overlayStyle}>
          <div style={{ textAlign: "center" }}>
            {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
            <BeatLoader
              loading={profileToastUpdateload}
              cssOverride={override}
              size={30}
              color={"#f8f9fa"}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div className="profile-page">
          <div className=" row">
            <div className="col-lg-6 col-md-6 col-12">
              <h5 className="mx-5 mt-4">Profile</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="mt-4  ">
                <ul
                  className="breadcrumb d-flex float-end me-5"
                  style={{ listStyle: "none" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      <a href="" className="text-decoration-none">
                        HOME
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/profile" className="text-decoration-none">
                      <a href="" className="text-decoration-none activepro">
                        PROFILE
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row mx-3">
            <div className=" col-lg-4 col-md-12 col-12  mt-3">
              <div className="card shadow h-100 w-100">
                <img
                  src={profileLogo}
                  className="profileimg d-flex mt-4"
                  style={{ cursor: "pointer" }}
                />
                {/* <div className="card-body p-0">
              <div className="row h-100">
                <div className="col mx-3 fs-6 form-profile ">
                  <p>First Name <span style={{ float: "inline-end" }}>:</span></p>
                  <p className="mt-3">User Name<span style={{ float: "inline-end" }}>:</span></p>
                  <p className="mt-3">Email<span style={{ float: "inline-end" }}>:</span></p>
                  <p className="mt-3">Mobile No<span style={{ float: "inline-end" }}>:</span></p>
                </div>
                <div className="col fs-6 ">
                  <p>Rukku</p>
                  <p className="mt-3">Admin</p>
                  <p className="mt-3">rukku@123</p>
                  <p className="mt-3">7825917675</p>
                </div>
              </div>
            </div> */}
                <div
                  className=" d-flex profile-add"
                  style={{
                    justifyContent: "space-evenly",
                    fontSize: "14px",
                    flexDirection: "row",
                    whiteSpace: "wrap",
                  }}
                >
                  <div className="mx-3 " style={{ fontWeight: "450" }}>
                    <p className="mt-3 d-flex">
                      First Name{" "}
                      <span className="colon" style={{ paddingLeft: "50px" }}>
                        :
                      </span>
                    </p>
                    <p className="mt-3 d-flex">
                      User Name
                      <span className="colon" style={{ paddingLeft: "50px" }}>
                        :
                      </span>
                    </p>
                    <p className="mt-3 d-flex">
                      Email
                      <span className="colons" style={{ paddingLeft: "90px" }}>
                        :
                      </span>
                    </p>
                    <p className="mt-3 d-flex">
                      Mobile No
                      <span className="colon" style={{ paddingLeft: "60px" }}>
                        :
                      </span>
                    </p>
                  </div>
                  <div className="profle_pg">
                    <p className="mt-3">
                      {userProfilfetch && userProfilfetch[0]?.fullName}
                    </p>
                    <p className="mt-3 username">
                      {userProfilfetch && userProfilfetch[0]?.userName}
                    </p>
                    <p
                      className="mt-3 d-flex emails"
                      style={{ wordBreak: "break-word" }}
                    >
                      {userProfilfetch && userProfilfetch[0]?.email}
                    </p>

                    <p className="mt-3">
                      {userProfilfetch && userProfilfetch[0]?.phoneNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow  mt-3">
                {/* Nav tabs */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active fs-6"
                      data-bs-toggle="tab"
                      href="#home"
                    >
                      Basic Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fs-6"
                      data-bs-toggle="tab"
                      href="#menu1"
                    >
                      Manage Password
                    </a>
                  </li>
                </ul>

                {/* Tab panes */}
                <div className="tab-content">
                  <div id="home" className="container tab-pane active">
                    <br />
                    <div className="d-flex" style={{ fontSize: "14px" }}>
                      <div className="mx-3 col-5 form-profile">
                        <div className="mt-2 ">
                          <label htmlFor="fullName">Full Name</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={handleChangeFullname}
                            placeholder="Full Name"
                            autoComplete="off"
                          />
                          {error.fullName ? (
                            <p style={{ color: "red" }}>{error.fullName}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="mt-2 ">
                          <label htmlFor="mobileNo">Mobile No</label>
                          <input
                            type="number"
                            className="form-control mt-2"
                            id="phoneNo"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={handleChangePhoneNo}
                            placeholder="Mobile No"
                          />
                          {error.phoneNo ? (
                            <p style={{ color: "red" }}>{error.phoneNo}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="mt-2 ">
                          <label htmlFor="address">Address</label>
                          <textarea
                            className="form-control mt-2"
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleChangeAddress}
                            placeholder="Address"
                            autoComplete="off"
                          ></textarea>
                          {error.address ? (
                            <p style={{ color: "red" }}>{error.address}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className=" col-5 form-profile">
                        <div className="mt-2 ">
                          <label htmlFor="userName">User Name</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="userName"
                            name="userName"
                            value={userName}
                            onChange={handleChangeUserName}
                            placeholder="User Name"
                            autoComplete="off"
                          />
                          {error.userName ? (
                            <p style={{ color: "red" }}>{error.userName}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="mt-2 ">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control mt-2"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChangeEmail}
                            placeholder="email"
                            autoComplete="off"
                          />
                          {error.email ? (
                            <p style={{ color: "red" }}>{error.email}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mx-5 mt-4 pb-3 d-flex float-end ">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmitProfileBasic}
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div id="menu1" className="container tab-pane fade">
                    <br />
                    <div
                      className="d-flex form-profile"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="mx-2">
                        <div className="mt-2">
                          <label htmlFor="oldPassword">Old Password</label>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="oldPassword"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={handleChangeOldPassword}
                            placeholder="Old Password"
                            autoComplete="off"
                          />
                          {error.oldPassword ? (
                            <p style={{ color: "red" }}>{error.oldPassword}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="mt-2">
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control mt-2"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            placeholder="Confirm Password"
                          />
                        </div>
                        {error.confirmPassword ? (
                          <p style={{ color: "red" }}>
                            {error.confirmPassword}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="mt-2 mx-3">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                          type="password"
                          className="form-control mt-2"
                          id="newPassword"
                          name="newPassword"
                          value={newPassword}
                          onChange={handleChangeNewPassword}
                          placeholder="New Password"
                        />
                        {error.newPassword ? (
                          <p style={{ color: "red" }}>{error.newPassword}</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="mx-5 mt-4 pb-3 d-flex float-end ">
                      <button
                        type="submit"
                        //  data-bs-toggle="modal"
                        //  data-bs-target="#myModal"
                        className="btn btn-primary"
                        onClick={handleSubmitManagePassword}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {passwordmodal && (
            <div
              className="modal fade show"
              style={{ display: "block" }}
              id="myModal"
            >
              <div className="modal-dialog">
                <div
                  className="modal-content"
                  style={{ padding: "10px", maxHeight: "200px" }}
                >
                  <div className="modal-header" style={{ padding: "5px" }}>
                    <h6 className="modal-title">Update Password</h6>
                    <button
                      type="button"
                      className="btn-close fa fa-xmark"
                      // data-bs-dismiss="modal"
                      onClick={() => setPasswordmodal(false)}
                      style={{ fontSize: "12px", fontWeight: "500px" }}
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ padding: "13px", fontSize: "14px" }}
                  >
                    Are you sure want to Logout..?
                  </div>
                  <div className="modal-footer" style={{ padding: "3px" }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      // data-bs-dismiss="modal"
                      onClick={() => setPasswordmodal(false)}
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleLogout}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
