import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userFetch } from "../../Redux/Thunk/MasterThunk/User/UserFetchThunk";
import { userRoleGet } from "../../Redux/Thunk/MasterThunk/User/UserRoleGetThunk";
import { userUpdate } from "../../Redux/Thunk/MasterThunk/User/UserUpdateThunk";
import { userGet } from "../../Redux/Thunk/MasterThunk/User/UserGetThunk";
import { object } from "yup";

const UserUpdate = () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
const location = useLocation();

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
      // const handleChangePassword = (e) => {
      //   setPassword(e.target.value)
      //   if(e.target.value){
      //     setError((name)=>({...name,password:""}))
      //   }
      //   }
        const handleChangeRoleno = (e) => {
          setUserRoleId(e.target.value)
          if(e.target.value){
            setError((name)=>({...name,userRoleId:""}))
          }
          }

  const userUpdateData = location.state?.user;
  console.log("userUpdateData", userUpdateData);


  useEffect(() => {
    if (userUpdateData) {
      setId(userUpdateData.id)
      console.log('setId',userUpdateData.id)
       setFullName(userUpdateData.fullName)
       setEmail(userUpdateData.email)
        setPhoneNo(userUpdateData.phoneNo)
        setAddress(userUpdateData.address)
        setUserName(userUpdateData.userName)
        setUserRoleId(userUpdateData.userRoleId)
        console.log("userUpdateData.userRoleId",userUpdateData.userRoleId)
    }
  }, [userUpdateData]);

  const userUpdateToastMs=useSelector((state)=>state.userUpdate?.data?.data)
  console.log("userUpdateToastMs",userUpdateToastMs)
  const userUpdateToasterr=useSelector((state)=>state.userUpdate?.error?.error?.reason)
  console.log("userUpdateToasterr",userUpdateToasterr)

  const handleUpdate = async() => {
    const newError = {};
    console.log("newError",newError)
    if (!fullName) newError.fullName = "requierd";
    console.log("newError.fullName",newError.fullName)
    if (!email) newError.email = "required";
    if (!phoneNo) {
      newError.phoneNo = "Required";
    } 
    else if (phoneNo.length !== 10) {
      newError.phoneNo = "Phone number must be 10 digits";
    }
    if (!address) newError.address = "required";
    if (!userName) newError.userName = "required";
    // if (!password) newError.password = "required";
    if (!userRoleId) newError.userRoleId = "required";
    
    
    setError(newError);

     if (Object.keys(newError).length === 0) {
  //   dispatch(userUpdate({id,fullName,email,phoneNo,address,userName,userRoleId})).then(()=>{

  //     dispatch(userGet())
  // navigate('/user')

  //   });
  try {
    const response = await dispatch(userUpdate({ id,fullName,email,phoneNo,address,userName,userRoleId  }));
    if (userUpdate.fulfilled.match(response)) {
      const success = response.payload.data
      console.log("success", success);
        //  setOpenEdit(false)
        navigate('/user')

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

    } else if (userUpdate.rejected.match(response)) {
      const errorMsg = response.payload.error.reason
      console.log("errmfghjklsg ", errorMsg);
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



  }

  // const handleUpdate = () => {
  //   const newError = {};
  //   if (!fullName) newError.fullName = "required";
  //   if (!email) newError.email = "required";
  //   if (!phoneNo) {
  //     newError.phoneNo = "Required";
  //   } else if (phoneNo.length !== 10) {
  //     newError.phoneNo = "Phone number must be 10 digits";
  //   }
  //   if (!address) newError.address = "required";
  //   if (!userName) newError.userName = "required";
  //   if (!password) newError.password = "required";
  //   if (!userRoleId) newError.userRoleId = "required";
  
  //   setError(newError);
    
  //     if (Object.keys(newError).length === 0) {
  //     const updateData = { id, fullName, email, phoneNo, address, userName, userRoleId };
  //     if (password) updateData.password = password;
  
  //     dispatch(userUpdate(updateData))
  //       .then(() => {
  //         dispatch(userGet());
  //         navigate("/user");
  //       })
  //       .catch((error) => {
  //         console.error("Error during update:", error);
  //       });
  //     }
  // };
  

const roleIds=useSelector((state)=>state.userRoleGet?.data?.data)
 console.log("roleIds",roleIds)


 
 useEffect(()=>{
  dispatch(userFetch(userUpdateData.id))
  dispatch(userRoleGet())
  },[])

  
  return (
    <div className="customerEditer">
      <div className="row">
      <div className="col-lg-6 col-md-6 col-12">
      <h5 className="mx-4 mt-3">User</h5>
        </div>
        <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-end">
        <div className="d-flex  ms-auto me-4 mt-3">
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
                to="/userupdate"
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
      
      <div className="row mx-3">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="card shadow">
            <div className="mx-3 mt-3 mb-3">
              <div>
                <label htmlFor="First Name">First Name<span style={{color:"red"}}>*</span></label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="form-control mt-2"
                  value={fullName}
                  placeholder=" First Name"
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
                  placeholder="Address"
                  onChange={handleChangeAddress}
                  autoComplete="off"
                />
                {error.address ?(<p style={{color:"red"}}>{error.address}</p>):("")}

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="card shadow ">
            <div className="mb-5   " style={{padding:"17px"}}>
              <div>
                <label htmlFor="User">User Name<span style={{color:"red"}}>*</span> </label>
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
              {/* <div className="mt-2">
                <label htmlFor="Password">Password<span style={{color:"red"}}>*</span> </label>
                <br />
                <input
                  type="Password"
                  name="password"
                  id="password"
                  className="form-control mt-2"
                  value={password}
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                {error.password ?(<p style={{color:"red"}}>{error.password}</p>):("")}

              </div> */}
              <div className="mt-2 mb-5" style={{paddingBottom:"80px"}}>
                <label htmlFor="User Role">User Role<span style={{color:"red"}}>*</span> </label>
                <br />
                <select
                  name="userRoleId"
                  className="form-select mt-2"
                  id="userRoleId"
                  value={userRoleId}
                  onChange={handleChangeRoleno}
                >
                  <option value="">Select Role</option>
                  {roleIds ?.map((item)=>{
                    return(
                      <option key={item.id} value={item?.id}>{item?.roleName}</option>
                    )
                  })}
                 
                </select>
                {error.userRoleId ?(<p style={{color:"red",padding:"25px"}}>{error.userRoleId}</p>):("")}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex float-end mt-4 me-5">
        <button type="submit" className="btn btn-primary"onClick={()=>handleUpdate()}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UserUpdate;
