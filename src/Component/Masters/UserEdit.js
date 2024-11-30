import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userCreate } from "../../Redux/Thunk/MasterThunk/User/UserPostThunk";
import { userRoleGet } from "../../Redux/Thunk/MasterThunk/User/UserRoleGetThunk";
import { userGet } from "../../Redux/Thunk/MasterThunk/User/UserGetThunk";

const UserEdit = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[fullName,setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[phoneNo,setPhoneNo]=useState("");
  const[address,setAddress]=useState("");
  const[userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const[userRoleId,setUserRoleId]=useState("");
  const[id,setId]=useState(null);
  const[error,setError]=useState("")

  const handleChangeFullName = (e) =>{
    setFullName(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,fullName:""}))
    }
  };
 const handleChangeEmail = (e) =>{
   setEmail(e.target.value)
   if(e.target.value){
    setError((name) => ({...name,email:""}))
   }
 }
  const handleChangePhoneNo = (e) => {
  setPhoneNo(e.target.value)
  if(e.target.value){
    setError((name)=>({...name,phoneNo:""}))
  }
  }
  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
    if(e.target.value){
      setError((name)=>({...name,address:""}))
    }
    }
    const handleChangeUsername = (e) => {
      setUserName(e.target.value)
      if(e.target.value){
        setError((name)=>({...name,userName:""}))
      }
      }
      const handleChangePassword = (e) => {
        setPassword(e.target.value)
        if(e.target.value){
          setError((name)=>({...name,password:""}))
        }
        }
        const handleChangeRoleno = (e) => {
          setUserRoleId(e.target.value)
          if(e.target.value){
            setError((name)=>({...name,userRoleId:""}))
          }
          }

   const userToastCreateMs=useSelector((state)=>state.userPost?.data?.data)
   console.log("userToastCreateMs",userToastCreateMs)       

   const userToastCreateEr=useSelector((state)=>state.userPost)
   const userToastCreateErr=userToastCreateEr?.error?.error?.reason
   console.log("userToastCreateErr",userToastCreateErr)

  const handlesubmit = async()=>{
    const newError = {};
    if (!fullName) newError.fullName = "requierd";
    // if (!email) newError.email = "required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    newError.email = "Required";
  } else if (!emailRegex.test(email)) {
    newError.email = "Invalid Email Format";  // Email format validation error
  }

    if (!phoneNo) {
      newError.phoneNo = "Required";
    } 
    else if (phoneNo.length !== 10) {
      newError.phoneNo = "Phone Number Must be 10 Digits";
    }
    if (!address) newError.address = "required";
    if (!userName) newError.userName = "required";
    if (!password) newError.password = "required";
    if (!userRoleId) newError.userRoleId = "required";

   
    
    setError(newError);
    console.log(newError)
    if (Object.keys(newError).length === 0) {
      // dispatch(userCreate({id,fullName,email,phoneNo,address,userName,password,userRoleId})).then(()=>{
      //   dispatch(userGet())
      
      // })
      try {
        const response = await dispatch(userCreate({ id,fullName,email,phoneNo,address,userName,password,userRoleId  }));
        if (userCreate.fulfilled.match(response)) {
          const success = response.payload.data
          console.log("success", success);
            //  setOpenEdit(false)
       navigate("/user")

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
              dispatch(userGet())

        } else if (userCreate.rejected.match(response)) {
          const errorMsg = response.payload.error.reason
          console.log("errmsg ", errorMsg);
          toast.error(errorMsg, {
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
    // function isOneOrAllEmpty(obj) {
    //   let allEmpty = true;  // Track if all values are empty
    //   let oneEmpty = false; // Track if at least one value is empty
    
    //   // Loop through each key in the object
    //   for (let key in obj) {
    //     // If any value is empty
    //     if (obj[key] === "") {
    //       oneEmpty = true;
    //     } else {
    //       // If any value is not empty, allEmpty is set to false
    //       allEmpty = false;
    //     }
    //   }
    
    //   // Return true if either one value or all values are empty
    //   return oneEmpty || allEmpty;
    // }

    // const iserror = isOneOrAllEmpty(newError)
    // if(userToastCreateMs){
    //   toast.success(userToastCreateMs, {
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
    // console.log(iserror)
    // if(!iserror){
    //   return;
    // }
    // else{
    //   navigate("/user")
    // }

    // if(userToastCreateErr){
    //   toast.error(userToastCreateErr, {
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
   
  }
  

 const roleId=useSelector((state)=>state.userRoleGet?.data?.data)
 console.log("roleId",roleId)


 useEffect(()=>{
  dispatch(userRoleGet())
 },[])

  return (
    <div className="customerEditer">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
        <h5 className="mx-4 mt-2">User</h5>
       </div>
         <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-end ">
         <div className="d-flex ms-auto me-4 mt-2">
          <ul className="breadcrumb " style={{ listStyle: "none" }}>
            <li className="breadcrumb-item">
            <Link to="/dashboard" style={{textDecoration:"none"}}>

              <a href="" className="text-decoration-none">
                HOME
              </a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/user" style={{ textDecoration: "none" }}>
                <a href="" className="text-decoration-none">
                  USER
                </a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to="/useredit"
                style={{ textDecoration: "none", color: "blue" }}
              >
                <a href="" className="text-decoration-none active">
                  DETAILS
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
       </div>
     
      <div className="row mx-2">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="card shadow ">
            <div className="mx-3 mt-2 mb-3">
              <div>
                <label htmlFor="First Name">First Name<span style={{color:"red"}}>*</span></label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="form-control mt-2"
                  value={fullName}
                  placeholder="First Name"
                  onChange={handleChangeFullName}
                  autoComplete="off"
                />
                {error.fullName ?(<p style={{color:"red"}}>{error.fullName}</p>):("")}
              </div>
              <div className="mt-2">
                <label htmlFor="Email">Email<span style={{color:"red"}}>*</span></label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control mt-2"
                  value={email}
                  placeholder="Email"
                  onChange={handleChangeEmail}
                  autoComplete="off"
                />
                {error.email ?(<p style={{color:"red"}}>{error.email}</p>):("")}

              </div>
              <div className="mt-2">
                <label htmlFor="Phone">Phone No<span style={{color:"red"}}>*</span></label>
                <br />
                <input
                  type="number"
                  name="phoneNo"
                  id="phoneNo"
                  className="form-control mt-2"
                  value={phoneNo}
                  placeholder="Phone No"
                  onChange={handleChangePhoneNo}
                />
                {error.phoneNo ?(<p style={{color:"red"}}>{error.phoneNo}</p>):("")}

              </div>
              <div className="mt-2">
                <label htmlFor="Address">Address<span style={{color:"red"}}>*</span> </label>
                <br />
                <textarea
                  name="address"
                  id="address"
                  className="form-control mt-2"
                  value={address}
                  placeholder="Address "
                  onChange={handleChangeAddress}
                  autoComplete="off"
                />
                {error.address ?(<p style={{color:"red"}}>{error.address}</p>):("")}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="card shadow">
            <div className=" mb-5" style={{ padding: "15px" }}>
              <div>
                <label htmlFor="User Name">User Name<span style={{color:"red"}}>*</span> </label>
                <br />
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  className="form-control mt-2"
                  placeholder="User Name "
                  onChange={handleChangeUsername}
                  autoComplete="off"
                />
                {error.userName ?(<p style={{color:"red"}}>{error.userName}</p>):("")}

              </div>
              <div className="mt-2">
                <label htmlFor="Password">Password<span style={{color:"red"}}>*</span></label>
                <br />
                <input
                  type="Password"
                  name="password"
                  id="password"
                  className="form-control mt-2"
                  value={password}
                  placeholder="Password"
                  onChange={handleChangePassword}
                />
                {error.password ?(<p style={{color:"red"}}>{error.password}</p>):("")}
              </div>
              <div className="mt-2 mb-5">
                <label htmlFor="User Role">User Role<span style={{color:"red"}}>*</span></label>
                <br />
                <select
                  name="userRoleId"
                  className="form-select mt-2"
                  id="userRoleId"
                  value={userRoleId}
                  onChange={handleChangeRoleno}
                >
                  <option value="">Select Role</option>
                  {roleId ?.map((item)=>{
                    return(
                      <option key={item.id} value={item?.id}>{item?.roleName}</option>
                    )
                  })}
                 
                </select>
                {error.userRoleId ?(<p style={{color:"red",padding:"24px"}}>{error.userRoleId}</p>):("")}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex float-end mt-3 me-5">
        <button type="submit" className="btn btn-primary" onClick={handlesubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
