import React, { useEffect, useState } from "react";
import "./CustomerEdit.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { customerPost } from "../../Redux/Thunk/MasterThunk/Customer/CustomerPostThunk";
// import { customerCountryGet } from "../../Redux/Thunk/MasterThunk/Customer/CustomerCountryGetThunk";
import { poultrycountryget } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryCountrygetThunk";
import { poultrycountry } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryCountryThunk";
import { poultryState } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryStateThunk";
import { customerget } from "../../Redux/Thunk/MasterThunk/Customer/CustomerGetThunk";

const CustomerEdit= () => {
   const navigate=useNavigate()
  const dispatch=useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const[status,setStatus]=useState("ACTIVE")

  const handleChangeName = (e) =>{
    setName(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,name:""}))
    }
  };
  const handleChangeEmail = (e) =>{
    setEmail(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,email :""}))
    }
  };
  const handleChangePhoneNumber = (e) =>{
    setPhoneNumber(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,phoneNumber :""}))
    }
  };
  const handleChangeAddress = (e) =>{
    setAddressLine(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,addressLine :""}))
    }
  };
  const handleChangePostalcode = (e) =>{
    setPostalCode(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,postalCode :""}))
    }
  };

  const custmToastCreate=useSelector((state)=>state.customerPost)
  const customToastMs=custmToastCreate?.data?.data

  console.log("customToastMs",customToastMs)
  const custmToastCreateEr=useSelector((state)=>state.customerPost)
  const custmToastCreateErr=custmToastCreateEr?.error?.error?.reason
  console.log("custmToastCreateErr",custmToastCreateErr)



  const handleSubmit = async() => {
    const newError = {};
    if (!name) newError.name = "requierd";
    // if (!email) newError.email = "required";
    // if (!phoneNumber) newError.phoneNumber = "required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newError.email = "Required";
    } else if (!emailRegex.test(email)) {
      newError.email = "Invalid Email Format";  // Email format validation error
    }
  
      if (!phoneNumber) {
        newError.phoneNumber = "Required";
      } 
      else if (phoneNumber.length !== 10) {
        newError.phoneNumber = "Phone Number Must be 10 Digits";
      }
    if (!addressLine) newError.addressLine = "required";
    if (!countryId) newError.countryId = "required";
    if (!stateId) newError.stateId = "required";
    if (!districtId) newError.districtId = "required";
    if (!postalCode) newError.postalCode = "required";

    setError(newError);
    if (Object.keys(newError).length === 0){
    // dispatch(customerPost({id,name,email,phoneNumber,addressLine,countryId,stateId,districtId,postalCode,status})).then(()=>{
    //   dispatch(customerget())
    
    // })
    try {
      const response = await dispatch(customerPost({ id,name,email,phoneNumber,addressLine,countryId,stateId,districtId,postalCode,status  }));
      if (customerPost.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
          //  setOpenEdit(false)
     navigate("/customer")

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
            dispatch(customerget())

      } else if (customerPost.rejected.match(response)) {
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

    
    //   if(customToastMs){
    // toast.success(customToastMs, {
    //        position: "top-right",
    //        autoClose: 5000,
    //        hideProgressBar: false,
    //        closeOnClick: true,
    //        pauseOnHover: true,
    //        draggable: true,
    //        progress: undefined,
    //        theme: "colored",
    //      });
    //   }
    //   console.log(iserror)
    //   if(!iserror){
    //     return;
    //   }
    //   else{
    //     navigate("/customer")
    //   }
      
    //     if(custmToastCreateErr){
    //   toast.error(custmToastCreateErr, {
    //          position: "top-right",
    //          autoClose: 5000,
    //          hideProgressBar: false,
    //          closeOnClick: true,
    //          pauseOnHover: true,
    //          draggable: true,
    //          progress: undefined,
    //          theme: "colored",
    //        });
    //     }
       
     
  
  };
 

 
      const customerCountDt=useSelector((state)=>state.PoultryCountryGet?.data?.data)
     
      console.log("customerCountDt",customerCountDt)

      const customState=useSelector((state)=>state.PoultryCountry)
      console.log("customState",customState)
      const customStateDt=customState?.data?.data
      console.log("customStateDt",customStateDt)

      const customerDisDt=useSelector((state)=>state.PoultryState?.data?.data)
      console.log("customerDisDt",customerDisDt)

      useEffect(()=>{
        // dispatch(customerCountryGet())
        dispatch(poultrycountryget())
      },[])

      const handlechangeCountry = (id) => {
        dispatch(poultrycountry(id))
        setCountryId(id)
        setError((name) => ({...name,countryId :""}))
        
          
      }
      const handleChangeState = (id) => {
        dispatch(poultryState(id))
        setStateId(id)
        setError((name) => ({...name,stateId :""}))
      }

      const handleChangeDistrict = (id) =>{
        setDistrictId(id)
        setError((name) => ({...name,districtId :""}))

      }


  return (
    <div className="customerEditer">
      {/* <div className='d-flex mt-2'>
        <h5 className='mx-5 mt-4'>CUSTOMER</h5>
        <div className='d-flex  ms-auto me-5 mt-4 '>
          <ul className='breadcrumb col-12 d-flex' style={{ listStyle: "none" }}>
            <li className='breadcrumb-item'><a href="" className='text-decoration-none'>HOME</a></li>
            <li className='breadcrumb-item'><Link to="/customer" className='cusmEdit'><a href="" className='text-decoration-none'>CUSTOMER</a></Link></li>
            <li className='breadcrumb-item  active'><Link to="/customeredit" className='cusmEdit'><a href="" className='text-decoration-none active'>DETAILS</a></Link></li>
          </ul>
        </div>
      </div> */}
      {/* <div className='row d-flex p-0'>
        <div className='col-12 col-lg-6 col-sm-12'>
          <h5 className='mx-5 mt-4'>CUSTOMER</h5>
        </div>
        <div className='col-12 col-lg-6 col-sm-12 mx-3 d-flex justify-contend-end'>
          <div className='d-flex   ms-auto me-5 '>
            <ul className='breadcrumb  d-flex ' style={{ listStyle: "none" }}>
              <li className='breadcrumb-item'><a href="" className='text-decoration-none'>HOME</a></li>
              <li className='breadcrumb-item'><Link to="/customer" className='cusmEdit'><a href="" className='text-decoration-none'>CUSTOMER</a></Link></li>
              <li className='breadcrumb-item  active'><Link to="/customeredit" className='cusmEdit'><a href="" className='text-decoration-none active'>DETAILS</a></Link></li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <h5 className=" mx-4 pt-3"> Customer</h5>
        </div>
        <div className="col-lg-6 col-md-6 col-12 fs-6 d-flex justify-contend-end">
          <div className="d-flex   ms-auto me-2">
            <ul
              className="breadcrumb  d-flex pt-3 "
              style={{ listStyle: "none" }}
            >
              <li className="breadcrumb-item">
              <Link to="/dashboard" style={{textDecoration:"none"}}>
              
                <a href="" className="text-decoration-none">
                  HOME
                </a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/customer" className="cusmEdit">
                  <a href="" className="text-decoration-none">
                    CUSTOMER
                  </a>
                </Link>
              </li>
              <li className="breadcrumb-item  active">
                <Link to="/customeredit" className="cusmEdit">
                  <a href="" className="text-decoration-none active">
                 CREATE
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
            <div className="mx-2 mt-2" style={{ padding: "20px" }}>
              <div>
                <label htmlFor="Customer">
                  Customer Name<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control mt-2"
                  value={name}
                  placeholder="Name"
                  onChange={handleChangeName}
                  autoComplete="off"
                />
                {error.name ? (<p style={{ color: "red" }}>{error.name} </p> ) : ( "" )}
              </div>
              <div className="mt-2">
                <label htmlFor="Email">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
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
                {error.email ? (
                  <p style={{ color: "red" }}>{error.email} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="Mobile">
                  Mobile No<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control mt-2"
                  value={phoneNumber}
                  placeholder="mobile No"
                  onChange={handleChangePhoneNumber}
                />
                {error.phoneNumber ? (
                  <p style={{ color: "red" }}>{error.phoneNumber}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="Address">
                  Address<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <textarea
                  name=""
                  id=""
                  className="form-control mt-2"
                  value={addressLine}
                  placeholder="Address"
                  onChange={handleChangeAddress}
                  autoComplete="off"
                />
                {error.addressLine ? (
                  <p style={{ color: "red" }}>{error.addressLine}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12 ">
          <div className="card shadow">
            <div className="mx-3 mt-4" style={{ paddingBottom: "48px" }}>
              <div>
                <label htmlFor="Country">
                  Country<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <select
                  name="countryId"
                  className="form-select mt-2"
                  id="countryId"
                  value={countryId}
                  onChange={(e) => handlechangeCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                   {customerCountDt?.map((item)=>{
              return(
              <option key={item.id} value={item?.id}>{item?.name}</option>
              )
             
            })} 
                </select>
                {error.countryId ? (
                  <p style={{ color: "red" }}>{error.countryId}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="State">
                  State<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <select
                  name="stateId"
                  className="form-select mt-2"
                  id="stateId"
                  value={stateId}
                  onChange={(e) => handleChangeState(e.target.value)}
                >
                  <option value="">Select State</option>
                    {customStateDt?.map((item)=>{
                   return(
                    <option key={item.id} value={item?.id}>{item?.stateName}</option>
                   )
                  })} 
                   
                </select>
                {error.stateId ? (
                  <p style={{ color: "red" }}>{error.stateId}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="District">
                  District<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <select
                  name="districtId"
                  className="form-select mt-2"
                  id="districtId"
                  value={districtId}
                  onChange={(e) => handleChangeDistrict(e.target.value)}
                >
                  <option value="">Select District</option>
                  {customerDisDt?.map((item)=>{
                    return(
                      <option key={item.id} value={item?.id}>{item?.districtName}</option>
                    )
                  })}
                  <option value="Thanjayur">Thanjayur</option>
                  <option value="Ariyalur">Ariyalur</option>
                </select>
                {error.districtId ? (
                  <p style={{ color: "red" }}>{error.districtId}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="PinCode">
                  Pin Code<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <input
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  value={postalCode}
                  className="form-control mt-2"
                  placeholder="Pin Code"
                  onChange={handleChangePostalcode}
                />
              </div>
              {error.postalCode ? (
                <p style={{ color: "red" }}>{error.postalCode}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex float-end mt-3 me-5">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CustomerEdit;
