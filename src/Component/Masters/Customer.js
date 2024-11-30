import React, { useEffect, useState } from "react";
import "./Customer.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { customerget } from "../../Redux/Thunk/MasterThunk/Customer/CustomerGetThunk";
import { customerDelete } from "../../Redux/Thunk/MasterThunk/Customer/CustomerDeleteThunk";
import { customerFetch } from "../../Redux/Thunk/MasterThunk/Customer/CustomerFetchThunk";
import BeatLoader from "react-spinners/BeatLoader";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";


//  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));


const Customer = () => {

  const dispatch= useDispatch()
  const navigate=useNavigate()
  const [customDelete, setcustomDelete] = useState(false);
  const[id,setId]=useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const[search,setSearch]=useState("");



  const customToastDlt=useSelector((state)=>state.customerDelete?.data?.data)
  console.log("customToastDlt",customToastDlt)

  const customToastDltEr=useSelector((state)=>state.customerDelete)
  const customToastDltErr=customToastDltEr?.error?.error?.reason
  console.log("customToastDltErr",customToastDltErr)
  

  const handleClickOpenDelete = (id) => {
    setcustomDelete(true);
    setId(id)
   };
  const handleCloseDelete = async() => {
    // setcustomDelete(false);
    // dispatch(customerDelete(id)).then(()=>{
    // dispatch(customerget())
     
    // })
    try {
      const response = await dispatch(customerDelete(id));
      if (customerDelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
          //  setOpenEdit(false)
     

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

      } else if (customerDelete.rejected.match(response)) {
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

    // if(customToastDlt){
    //   toast.success(customToastDlt, {
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
    // if(customToastDltErr){
    //   toast.error(customToastDltErr, {
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
    
  };
 
 


 const customerGetDt=useSelector((state)=>state.customerGet?.data?.data)
 console.log("customerGetDt",customerGetDt)
//  const customerFetched = useSelector((state) => state.customerFetch?.data);

const customerGetload=useSelector((state)=>state.customerGet.loading)


useEffect(()=>{
  dispatch(customerget())
 },[])

// useEffect(() => {
//   if (customerFetched) {
//     setName(customerFetched?.name);
//     setEmail(customerFetched?.email);
//     setPhoneNumber(customerFetched?.phoneNumber);
//     setAddressLine(customerFetched?.addressLine);
//     setCountryId(customerFetched?.countryId);
//     setStateId(customerFetched?.stateId);
//     setDistrictId(customerFetched?.districtId);
//     setPostalCode(customerFetched?.postalCode);
//   }
//  }, [customerFetched]);

 const handleopenUpdate = (val) => {
//   setId(val.id)

 console.log('val',val)
 
  
  navigate('/customerUpdate', { state: { customer: val } });

  // localStorage.setItem('name',val?.name)
  // localStorage.setItem('email',val?.email)
  // localStorage.setItem('phoneNo',val?.phoneNo)
  // localStorage.setItem('address',val?.address)
  
  // localStorage.setItem('countryName',val?.countryName)
  // localStorage.setItem('stateName',val?.stateName)
  // localStorage.setItem('districtName',val?.districtName)
  // localStorage.setItem('postelCode',val?.postelCode)


 
 }
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
    {customerGetload ?(
      <div style={overlayStyle}>
      <div style={{ textAlign: "center" }}>
          {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
          <BeatLoader
              loading={customerGetload}
              cssOverride={override}
              size={30}
              color={"#f8f9fa"}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
      </div>
  </div>) : (
      <div className="customer_Details">
        <div className="d-flex mt-2 mx-3 customer_Headerbutton">
          <h5 className="mt-4">Customer</h5>
          <Link to="/customeredit">
            <button type="button" className="px-2 py-1 mt-4 ">
              + New Customer
            </button>
          </Link>
        </div>
        <div className=" search d-flex justify-content-end mt-3 me-3">
        <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
          <input
            type="text"
            className="form-control-sm border border-light shadow fs-6 px-5 pe-1"
            autoComplete=""
            style={{ borderRadius: "4px", fontWeight: "4px" }}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by Customer..."
          />
          </IconField>
        </div>
        <div className="  table-responsive mt-3 mx-3">
          <table className="table mb-5">
            <thead className="table-primary">
              <tr className="fs-6">
                <th>S.no</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
             {/* {(customerGetDt || [])
              .filter((val) => {
                if (search.toLowerCase() === '') return val; 
                return (
                  val.name.toLowerCase().includes(search.toLowerCase()) || 
                  val.address.toLowerCase().includes(search.toLowerCase())||
                  val.email.toLowerCase().includes(search.toLowerCase())

                );
              })
              .map((val, index) => ( */}
              {(() => {
    // Filter the data
    const filteredData = (customerGetDt || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.name.toLowerCase().includes(search.toLowerCase())||
        val.address.toLowerCase().includes(search.toLowerCase())||
        val.email.toLowerCase().includes(search.toLowerCase())
 });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (

              
              <tr key={index}>
                <td>{index+1}</td>
                <td>{val?.name}</td>
                <td>{val?.phoneNo}</td>
                <td>{val?.email}</td>
                <td>{val?.address}</td>

                <td className="editDeleteIcons">
                  {/* <Link to="/customerupdate"> */}
                    <span className="customer_editicon px-2 py-1" onClick={()=>handleopenUpdate(val)}>
                      <i className="fa-solid fa-pen-to-square fs-6 mt-1 " style={{cursor:"pointer"}}></i>
                    </span>
                  {/* </Link> */}
                  <span
                    className="customer_editdelete  px-2 py-1"
                    onClick={()=>handleClickOpenDelete(val.id)}
                     data-bs-toggle="modal" data-bs-target="#myModal"
                  >
                    
                    <i className="fa-regular fa-trash-can fs-6  " style={{cursor:"pointer"}}></i>
                  </span>
                </td>
              </tr>
              ))}
              return (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <p>No Data Found</p>
                  </td>
                </tr>
              );
            })()}
            </tbody>
            
          </table>
        </div>
      </div>
      )}


      {/* <BootstrapDialog
        onClose={() => setcustomDelete(false)}
        aria-labelledby="customized-dialog-title"
        open={customDelete}

        fullWidth
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          Delete Customer
          <IconButton
            aria-label="close"
            onClick={() => setcustomDelete(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Are you sure want to delete ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setcustomDelete(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleCloseDelete}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
     
     <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content" style={{ padding: '10px', maxHeight: '200px' }}>
      <div className="modal-header" style={{ padding: '5px' }}>
        <h6 className="modal-title">Delete Customer</h6>
        <button type="button" className="btn-close fa fa-xmark" data-bs-dismiss="modal"style={{fontSize:"12px",fontWeight:"500px"}}></button>
      </div>
      <div className="modal-body" style={{ padding: '13px', fontSize: '14px' }}>
        Are you sure you want to delete..?
      </div>
      <div className="modal-footer" style={{ padding: '2px' }}>
        <button type="button" className="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={handleCloseDelete}>OK</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Customer;
