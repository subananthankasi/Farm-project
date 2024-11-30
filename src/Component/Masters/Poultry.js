import React, { useEffect, useState } from 'react'
import "./poultry.css";
import { FaRegEdit } from "react-icons/fa";
 import { RiDeleteBinLine } from "react-icons/ri";
 import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { poultrycreate } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryPostThunk';
import { poultrycountryget } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryCountrygetThunk';
import { poultrycountry } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryCountryThunk';
import { poultryState } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryStateThunk';
import { poultryget } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryGetThunk';
import { poultrydelete } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryDeleteThunk';
import { poultryfetch } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryFetchThunk';
import { poultryupdate } from '../../Redux/Thunk/MasterThunk/Poultry/PoultryUpdateThunk';
import BeatLoader from 'react-spinners/BeatLoader';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Poultry = () => {

  const dispatch=useDispatch()

  const[poultryName,setPoultryName]=useState("");
  const[phoneNo,setPhoneNo]=useState("");
  const[address,setAddress]=useState("");
  const[countryId,setCountryId]=useState("");
  const[stateId,setStateId]=useState("");
  const[districtId,setDistrictId]=useState("");
  const[id,setId]=useState(null);
  const[error,setError]=useState(""); 
  const[search,setSearch]=useState("");
  const [status,setStatus]=useState("ACTIVE");

  const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');


      const [openEdit, setOpenEdit] = useState(false);
      const [openUpdate, setOpenUpdate] = useState(false);
    const [poultryDelete, setpoultryDelete] = useState(false);

    const handleChangepoultryName = (e) =>{
      setPoultryName(e.target.value)
      if(e.target.value){
        setError((name) => ({...name,poultryName :""}))
      }
    };
    const handleChangephoneNo=(e)=>{
      setPhoneNo(e.target.value)
      if(e.target.value){
        setError((name)=>({...name,phoneNo :""}))
      }
    };
    const handleChangeaddress=(e)=>{
      setAddress(e.target.value)
      if(e.target.value){
        setError((name)=>({...name,address:""}))
      }
    };
    // const handleChangecountry=(e)=>{
    //   setCountryId(e.target.value)
    //   if(e.target.value){
    //     setError((name)=>({...name,countryId :""}))
    //   }
    // };
    // const handleChangestate=(e)=>{
    //   setStateId(e.target.value)
    //   if(e.target.value){
    //     setError((name)=>({...name,stateId :""}))
    //   }
    // };
    // const handleChangedistrict=(e)=>{
    //   setDistrictId(e.target.value)
    //   if(e.target.value){
    //     setError((name)=>({...name,districtId :""}))
    //   }
    // };
  const createToast=useSelector((state)=>state.PoultryPost)
  const createMs=createToast?.data?.data
  console.log("createMs",createMs)

  const createToastErr=useSelector((state)=>state.PoultryPost)
  const createErr=createToastErr?.error?.error?.reason
  console.log(createErr)

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
    setId("");
    setPoultryName("");
    setPhoneNo("");
    setAddress("");
    setCountryId("");
    setStateId("");
    setDistrictId("");
    setError("")
  };
  const handleCloseEdit = async() => {
    const newError = {};
    if (!poultryName) newError.poultryName = "requierd";
    // if (!phoneNo) newError.phoneNo = "required";
    if (!phoneNo) {
      newError.phoneNo = "Required";
    } 
    else if (phoneNo.length !== 10) {
      newError.phoneNo = "Phone Number Must be 10 Digits";
    }
    if (!address) newError.address = "required";
    // if (!id) newError.id = "required";

    if (!countryId) newError.countryId = "required";
    if (!stateId) newError.stateId = "required";
    if (!districtId) newError.districtId = "required";

     setError(newError);
    if (Object.keys(newError).length === 0) {
      const poultryId = id || null;
  
    //   dispatch(poultrycreate({id: poultryId,poultryName,phoneNo,address,countryId,stateId,districtId,status})).then(()=>{
    // setOpenEdit(false);
    // dispatch(poultryget())
  
    try {
      const response = await dispatch(poultrycreate({ id: poultryId,poultryName,phoneNo,address,countryId,stateId,districtId,status }));
      if (poultrycreate.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setOpenEdit(false)
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
            dispatch(poultryget())

      } else if (poultrycreate.rejected.match(response)) {
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
 };

  
 const countryget=useSelector((state)=>state.PoultryCountryGet)
 console.log("countryget",countryget)
   const countrydt=countryget?.data?.data
   console.log("countrydt",countrydt)

  useEffect(()=>{
  dispatch(poultrycountryget())
  },[])

  const  poulget=useSelector((state)=>state.PoultryGet)
  const poulgetdt=poulget?.data?.data
  console.log("poulgetdt",poulgetdt)

  const  poultryLoading=useSelector((state)=>state.PoultryGet.loading)


  useEffect(()=>{
  dispatch(poultryget())
  },[])
 
  const deleteToast=useSelector((state)=>state.PoultryDelete)
  const deleteMs=deleteToast?.data?.data
  console.log("deleteMs",deleteMs)
 
  const deleteToastErr=useSelector((state)=>state.PoultryDelete)
  const deleteErrms=deleteToastErr?.error?.error?.reason
  console.log(deleteErrms)


  const handleClickOpenDelete = (id) => {
    setpoultryDelete(true);
    setId(id)
  };
  const handleCloseDelete =async () => {
    //  setpoultryDelete(false);
    // dispatch(poultrydelete(id)).then(()=>{
    // dispatch(poultryget())
      
    // })
    try {
      const response = await dispatch(poultrydelete(id));
      if (poultrydelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setpoultryDelete(false)
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
            dispatch(poultryget())

      } else if (poultrydelete.rejected.match(response)) {
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
      
  

 };  
 
const updateToast=useSelector((state)=>state.PoultryUpdate)
 const updateMs=updateToast?.data?.data
 console.log(updateMs)
 const updateToastErr=useSelector((state)=>state.PoultryUpdate.data)
 console.log("updateToastErr",updateToastErr)
 const updateToastEr=updateToastErr?.error?.error
console.log("updateToastEr",updateToastEr)

  const handleClickOpenUpdate = (val) => {
    setError("")
    setOpenUpdate(true);
    setId(val.id)
    dispatch(poultryfetch(val.id))
    setPoultryName(val.poultryName)
    setPhoneNo(val.phoneNo)
    setAddress(val.address)
    handleChangecountry(val.countryId)
    console.log("val.countryId",val.countryId)
    handleChangestate(val.stateId)
    handleChangedistrict(val.districtId)
  };
  const handleCloseUpdate =async () => {
    const newError = {};
    if (!poultryName) newError.poultryName = "requierd";
    // if (!phoneNo) newError.phoneNo = "required";
    if (!phoneNo) {
      newError.phoneNo = "Required";
    } 
    else if (phoneNo.length !== 10) {
      newError.phoneNo = "Phone Number Must be 10 Digits";
    }
    if (!address) newError.address = "required";
    // if (!id) newError.id = "required";

    if (!countryId) newError.countryId = "required";
    if (!stateId) newError.stateId = "required";
    if (!districtId) newError.districtId = "required";

     setError(newError);
    if (Object.keys(newError).length === 0) {
    // setOpenUpdate(false);
    // dispatch(poultryupdate({id,poultryName,phoneNo,address,countryId,stateId,districtId,status})).then(()=>{
    //   dispatch(poultryget())
    //  })
    try {
      const response = await dispatch(poultryupdate({ id,poultryName,phoneNo,address,countryId,stateId,districtId,status }));
      if (poultryupdate.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setOpenUpdate(false)
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
            dispatch(poultryget())

      } else if (poultryupdate.rejected.match(response)) {
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
   
    };
   

 const countryState=useSelector((state)=>state.PoultryCountry)
 console.log("countryState",countryState)
 const cutyState=countryState?.data?.data
 console.log("cutyState",cutyState)

 const countryDistrict=useSelector((state)=>state.PoultryState)
 console.log(countryDistrict,"countryDistrict")
 const cutryDis=countryDistrict?.data?.data
 console.log("cutryDis",cutryDis)

 const handleChangecountry = (id) => {
 dispatch(poultrycountry(id))
 setCountryId(id)
 setError((name)=>({...name,countryId:""}))

 }
 const handleChangestate = (id) =>{
  dispatch(poultryState(id))
  setStateId(id)
  setError((name)=>({...name,stateId:""}))

 }
 const handleChangedistrict = (id) => {
   setDistrictId(id)
   setError((name)=>({...name,districtId:""}))

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
    {poultryLoading?(
       <div style={overlayStyle}>
       <div style={{ textAlign: "center" }}>
           {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
           <BeatLoader
               loading={poultryLoading}
               cssOverride={override}
               size={30}
               color={"#f8f9fa"}
               aria-label="Loading Spinner"
               data-testid="loader"
           />
       </div>
   </div>) : (
    <div className='poultry_Details'>
         <div className='d-flex mt-2 mx-3 poultry_Headerbutton'>
         <h5 className='mt-4'>Poultry</h5>
          <button type="button" className='px-2 py-1 mt-4' onClick={handleClickOpenEdit}>+ New Poultry</button>
         </div>
         <div className='search d-flex justify-content-end mt-3 me-3'>
         <IconField iconPosition="left">
         <InputIcon className="pi pi-search" />
            <input type='text' 
            className='form-control-sm border border-light shadow fs-6 px-5 pe-1' 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search by Poultry...' />
            </IconField>
         </div>
         <div className='table-responsive mt-3 mx-3'>
        <table className='table mb-5'>
            <thead className='table-primary'>
                <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th>Action</th>
                  
                </tr>
            </thead>
            <tbody>
                {/* {(poulgetdt || [])
                  .filter((val) => {
                    if (search.toLowerCase() === '') return val; 
                    return (
                      val.poultryName.toLowerCase().includes(search.toLowerCase()) || 
                      val.address.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((val, index) => ( */}
                  {(() => {
    // Filter the data
    const filteredData = (poulgetdt || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.poultryName.toLowerCase().includes(search.toLowerCase())||
        val.address.toLowerCase().includes(search.toLowerCase())
       });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{val?.poultryName}</td>
                <td>{val?.phoneNo}</td>
                <td>{val?.address}</td>
                <td className='editDeleteIcons'><span className='poultry_editicon px-2 py-1' onClick={()=>handleClickOpenUpdate(val)}>
                <i className="fa-solid fa-pen-to-square fs-6 mt-1 " style={{cursor:"pointer"}} ></i>
                </span>
               <span className='poultry_editdelete  px-2 py-1'
                data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleClickOpenDelete(val.id)}>
               
               <i className="fa-regular fa-trash-can fs-6 me-3" style={{cursor:"pointer"}}></i></span></td>
            </tr>
            ))}
            return (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
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
   {/* Edit modal........................................................................................... */}
   
   <div>
      <BootstrapDialog
        // onClose={()=>setOpenEdit(false)}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
        fullWidth
        
      
      >
        <DialogTitle sx={{ m: 0, p: 2,fontSize:18,}} id="customized-dialog-title">
         <header>Poultry</header> 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setOpenEdit(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>
            
          <label htmlFor="Poultry ">Poultry <span style={{color:"red"}}>*</span></label>
            <input type="text"
              id="poultryName"
              className="form-control"
              name="poultryName"
              // value={resData?.product}
              value={poultryName}
              onChange={handleChangepoultryName}
              placeholder='Poultry'
              autoComplete='off'
            />
            {error.poultryName ?(<p style={{color:"red"}}>{error.poultryName}</p>):("")}
          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Mobile No ">Mobile No<span style={{color:"red"}}>*</span></label>
            <input
              type="number"
              id="phoneNo"
              className="form-control"
              name="phoneNo"
              // value={resData?.product}
              value={phoneNo}
              onChange={handleChangephoneNo}
              placeholder='Mobile No'
            />
            {error.phoneNo ?(<p style={{color:"red"}}>{error.phoneNo}</p>):("")}
          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Address ">Address<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              id="address"
              className="form-control"
              name="address"
              // value={resData?.product}
              value={address}
              onChange={handleChangeaddress}
              placeholder='Address'
              autoComplete='off'
            />
            {error.address ?(<p style={{color:"red"}}>{error.address}</p>):("")}
          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Country ">Country<span style={{color:"red"}}>*</span></label>
          <select
              name="countryId"
              className="form-control"
              id="countryId"
              value={countryId}
              onChange={(e)=>handleChangecountry(e.target.value)}
              >
             <option value="">Select Country</option>
             {countrydt?.map((item)=>{
              return(
              <option key={item.id} value={item?.id}>{item?.name}</option>
              )
             
            })}
          </select>
          {error.countryId ?(<p style={{color:"red"}}>{error.countryId}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="State ">State<span style={{color:"red"}}>*</span></label>
          <select
              name="stateId"
              className="form-control"
              id="stateId"
              value={stateId}
              onChange={(e)=>handleChangestate(e.target.value)}
              >
             <option value="">Select State</option>
             {cutyState?.map((item)=>{
              return(
                <option key={item.id} value={item?.id}>{item?.stateName}</option>
              )
             })}
             
          </select>
          {error.stateId ?(<p style={{color:"red"}}>{error.stateId}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="District ">District<span style={{color:"red"}}>*</span></label>
          <select
              name="districtId"
              className="form-control"
              id="districtId"
              value={districtId}
              onChange={(e)=>handleChangedistrict(e.target.value)}
              >
             <option value="Select District">Select District</option>
             {cutryDis?.map((item)=>(
              <option key={item.id} value={item?.id}>{item?.districtName}</option>
             ))}
             
          </select>
          {error.districtId ?(<p style={{color:"red"}}>{error.districtId}</p>):("")}

          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleCloseEdit}>
            SUBMIT
          </Button>
        </DialogActions>
      </BootstrapDialog>
     </div>

     
     {/* delete modal ........................................... */}
     <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content" style={{ padding: '10px', maxHeight: '200px' }}>
      <div className="modal-header" style={{ padding: '5px' }}>
        <h6 className="modal-title">Delete Poultry</h6>
        <button type="button" className="btn-close fa fa-xmark" data-bs-dismiss="modal" style={{fontSize:"12px",fontWeight:"500px"}}></button>
      </div>
      <div className="modal-body" style={{ padding: '13px', fontSize: '14px' }}>
        Are you sure you want to delete..?
      </div>
      <div className="modal-footer" style={{ padding: '3px',}}>
        <button type="button" className="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={()=>handleCloseDelete()}>OK</button>
      </div>
    </div>
  </div>
</div>
   {/* ................................................Update modal................................................... */}
   <div>
      <BootstrapDialog
        // onClose={()=>setOpenUpdate(false)}
        aria-labelledby="customized-dialog-title"
        open={openUpdate}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2,fontSize:18, }} id="customized-dialog-title">
         <header>Poultry</header> 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setOpenUpdate(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>
          <label htmlFor="Poultry ">Poultry <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              id="poultryName"
              className="form-control"
              name="poultryName"
              // value={resData?.product}
              value={poultryName}
              onChange={handleChangepoultryName}
              placeholder='Poultry'
              autoComplete='off'
            />
            {error.poultryName ?(<p style={{color:"red"}}>{error.poultryName}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Mobile No ">Mobile No<span style={{color:"red"}}>*</span></label>
            <input
              type="number"
              id="phoneNo"
              className="form-control"
              name="phoneNo"
              // value={resData?.product}
              value={phoneNo}
              onChange={handleChangephoneNo}
              placeholder='Mobile No'
            />
            {error.phoneNo ?(<p style={{color:"red"}}>{error.phoneNo}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Address ">Address<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              id="address"
              className="form-control"
              name="address"
              // value={resData?.product}
              value={address}
              onChange={handleChangeaddress}
              placeholder='Address'
              autoComplete='off'
            />
            {error.address ?(<p style={{color:"red"}}>{error.address}</p>):("")}
            
          </Typography>
          <Typography gutterBottom>
          <label htmlFor="Country ">Country<span style={{color:"red"}}>*</span></label>
          <select
              name="countryId"
              className="form-control"
              id="countryId"
              value={countryId}
              onChange={(e)=>handleChangecountry(e.target.value)}
              >
             <option value="">Select Country</option>
             {countrydt?.map((item)=>{
              return(
              <option key={item.id} value={item?.id}>{item?.name}</option>
              )
             
            })}
          </select>
          {error.countryId ?(<p style={{color:"red"}}>{error.countryId}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="State ">State<span style={{color:"red"}}>*</span></label>
          <select
              name="stateId"
              className="form-control"
              id="stateId"
              value={stateId}
              onChange={(e)=>handleChangestate(e.target.value)}
              >
             <option value="">Select State</option>
             {cutyState?.map((item)=>{
              return(
                <option key={item.id} value={item?.id}>{item?.stateName}</option>
              )
             })}
             
          </select>
          {error.stateId ?(<p style={{color:"red"}}>{error.stateId}</p>):("")}

          </Typography>
          <Typography gutterBottom>
          <label htmlFor="District ">District<span style={{color:"red"}}>*</span></label>
          <select
              name="districtId"
              className="form-control"
              id="districtId"
              value={districtId}
              onChange={(e)=>handleChangedistrict(e.target.value)}
              >
             <option value="Select District">Select District</option>
             {cutryDis?.map((item)=>(
              <option key={item.id} value={item?.id}>{item?.districtName}</option>
             ))}
             
          </select>
          {error.districtId ?(<p style={{color:"red"}}>{error.districtId}</p>):("")}

          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={()=>handleCloseUpdate()}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    
   </div>
   </>
  )
}

export default Poultry