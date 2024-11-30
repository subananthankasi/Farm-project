import React, { useEffect, useState } from "react";
import "./CustomerEdit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { customerUpdate } from "../../Redux/Thunk/MasterThunk/Customer/CustomerUpdateThunk";
import { poultryState } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryStateThunk";
import { poultrycountry } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryCountryThunk";
import { poultrycountryget } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryCountrygetThunk";
// import { customerget } from '../../Redux/Thunk/MasterThunk/Customer/CustomerGetThunk'
import { customerFetch } from "../../Redux/Thunk/MasterThunk/Customer/CustomerFetchThunk";
import { customerget } from "../../Redux/Thunk/MasterThunk/Customer/CustomerGetThunk";

const CustomerUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
  const [status, setStatus] = useState("ACTIVE");

  const customer = location.state?.customer;
  console.log("customer", customer);

  //  console.log("customer", customer);
  //   const name1 = localStorage.getItem('name')
  //   const email1 = localStorage.getItem('email')
  //   const phoneNumber1 = localStorage.getItem('phoneNo')
  //   const addressLine1 = localStorage.getItem('address')
  //   const countryId1 = localStorage.getItem('countryName')
  //   const stateId1 = localStorage.getItem('stateName')
  //   const districtId1 = localStorage.getItem('districtName')
  //   const postalCode1 = localStorage.getItem('postelCode')

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

  useEffect(() => {
    if (customer) {
      setId(customer.id);
      setName(customer.name);
      setEmail(customer.email);
      setPhoneNumber(customer.phoneNo);
      setAddressLine(customer.address);
      handlechangeCountry(customer.countryId);
      handleChangeState(customer.stateId);
      handleChangeDistrict(customer.districtId);
      setPostalCode(customer.postelCode);
      //  setPostalCode(localStorage.getItem('postelCode'))
    }
  }, [customer]);

  const customToastUpdateMs = useSelector(
    (state) => state.customerUpdate?.data?.data
  );
  console.log("customToastUpdateMs", customToastUpdateMs);

  const handleUpdate =async () => {
    const newError = {};
    if (!name) newError.name = "requierd";
    // if (!email) newError.email = "required";
    // if (!phoneNumber) newError.phoneNumber = "required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newError.email = "Required";
    } else if (!emailRegex.test(email)) {
      newError.email = "Invalid Email Format"; // Email format validation error
    }

    if (!phoneNumber) {
      newError.phoneNumber = "Required";
    } else if (phoneNumber.length !== 10) {
      newError.phoneNumber = "Phone Number Must be 10 Digits";
    }
    if (!addressLine) newError.addressLine = "required";
    if (!countryId) newError.countryId = "required";
    if (!stateId) newError.stateId = "required";
    if (!districtId) newError.districtId = "required";
    if (!postalCode) newError.postalCode = "required";

    setError(newError);
    if (Object.keys(newError).length === 0) {
     
      // dispatch(
      //   customerUpdate({
      //     id,
      //     name,
      //     email,
      //     phoneNumber,
      //     addressLine,
      //     countryId,
      //     stateId,
      //     districtId,
      //     postalCode,
      //     status,
      //   })
      // ).then(() => {
      //   navigate("/customer");
      //   dispatch(customerget());
      // });
      try {
        const response = await dispatch(customerUpdate({ id,name,email,phoneNumber,addressLine,countryId,stateId,districtId,postalCode,status  }));
        if (customerUpdate.fulfilled.match(response)) {
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
  
        } else if (customerUpdate.rejected.match(response)) {
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

      // if (customToastUpdateMs) {
      //   toast.success(customToastUpdateMs, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }
    
  };

  const customerCountDts = useSelector(
    (state) => state.PoultryCountryGet?.data?.data
  );

  console.log("customerCountDts", customerCountDts);

  const customState = useSelector((state) => state.PoultryCountry);
  console.log("customState", customState);
  const customStateDt = customState?.data?.data;
  console.log("customStateDt", customStateDt);

  const customerDisDt = useSelector((state) => state.PoultryState?.data?.data);
  console.log("customerDisDt", customerDisDt);

  useEffect(() => {
    dispatch(poultrycountryget());
    // dispatch(customerget())
    dispatch(customerFetch(customer.id));
  }, []);

  const handlechangeCountry = (id) => {
    dispatch(poultrycountry(id));
    setCountryId(id);
  };
  const handleChangeState = (id) => {
    dispatch(poultryState(id));
    setStateId(id);
  };

  const handleChangeDistrict = (id) => {
    setDistrictId(id);
  };
  return (
    <div className="customerUpdate">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 ">
          <h5 className="mx-4 pt-3">Customer</h5>
        </div>
        <div className="col-lg-6  col-md-6 col-12  d-flex justify-contend-end">
          <div className="d-flex mt-3 ms-auto me-3">
            <ul className="breadcrumb " style={{ listStyle: "none" }}>
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
                   UPDATE
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
            <div className="mx-3 mt-2 mb-4">
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
                {error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
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
                  onChange={ handleChangeEmail}
                  autoComplete="off"
                />
                {error.email ? (
                  <p style={{ color: "red" }}>{error.email}</p>
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
                  onChange={ handleChangePhoneNumber}
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
                  name="addressLine"
                  id="addressLine"
                  className="form-control mt-2"
                  value={addressLine}
                  placeholder="Address "
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
        <div className=" col-lg-6 col-md-6 col-12">
          <div className="card shadow pb-4">
            <div className="mx-3 mt-4 mb-2">
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
                  {customerCountDts?.map((item) => {
                    return (
                      <option key={item.id} value={item?.id}>
                        {item?.name}
                      </option>
                    );
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
                  {customStateDt?.map((item) => {
                    return (
                      <option key={item.id} value={item?.id}>
                        {item?.stateName}
                      </option>
                    );
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
                  <option value="">Select District</option>
                  {customerDisDt?.map((item) => {
                    return (
                      <option key={item.id} value={item?.id}>
                        {item?.districtName}
                      </option>
                    );
                  })}
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
                {error.postalCode ? (
                  <p style={{ color: "red" }}>{error.postalCode}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex float-end mt-4 me-5">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handleUpdate()}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CustomerUpdate;
