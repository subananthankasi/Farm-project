import React, { useEffect, useState } from "react";
import "./breed.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
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
import { Breedscreate } from "../../Redux/Thunk/MasterThunk/Breed/BreedPostThunk";
import { Breedtype } from "../../Redux/Thunk/MasterThunk/Breed/BreedTypegetThunk";
import { Breedget } from "../../Redux/Thunk/MasterThunk/Breed/BreedGetThunk";
import { Breeddelete } from "../../Redux/Thunk/MasterThunk/Breed/BreedDeleteThunk";
import { Breedfetch } from "../../Redux/Thunk/MasterThunk/Breed/BreedFetchThunk";
import { BreedUpdate } from "../../Redux/Thunk/MasterThunk/Breed/BreedUpdataThunk";
import BeatLoader from "react-spinners/BeatLoader";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Breed = () => {
  const dispatch=useDispatch()
  const[breedTypeId,setBreedTypeId]=useState("");
  const[breedName,setBreedName]=useState("");
  const[description,setDescription]=useState("");
  const[id,setId]=useState(null);
  
  const[error,setError]=useState("");
  const[search,setSearch]=useState("")

  const [openEdit, setOpenEdit] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);
  const [breedDelete, setbreedDelete] = useState(false);

  const handleChangebreedtype = (e) => {
    setBreedTypeId(e.target.value)
    if (e.target.value) {
      setError((name) => ({ ...name, breedTypeId: "" }))
    }
  };
  const handleChangebreedName = (e) => {
    setBreedName(e.target.value)
    if (e.target.value) {
      setError((name) => ({ ...name, breedName: "" }))
    }
  };
  const handleChangebreeddes = (e) => {
    setDescription(e.target.value)
    if (e.target.value) {
      setError((name) => ({ ...name, description: "" }))
    }
  };

 const toastcte=useSelector((state)=>state.BreedPost)
 const toastms=toastcte?.data?.data
 console.log("toastms",toastms)
 const toastcter=useSelector((state)=>state.BreedPost)
 const errmsct=toastcter?.error?.error?.reason
 console.log("errmsct",errmsct)
  

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
    setBreedName('')
    setDescription('')
    setBreedTypeId('')
    setError("")
    setId("")
  };
  const handleCloseEdit =async () => {
    const newError={};
    if(!breedTypeId)newError.breedTypeId="required";
    if(!breedName)newError.breedName="required";
    if(!description)newError.description="required";
    
    setError(newError);
    if(Object.keys(newError).length===0){
    //  setOpenEdit(false);
    // dispatch(Breedscreate({breedName,breedTypeId,description})).then(()=>{
    //   dispatch(Breedget())
   
    // })
    try {
      const response = await dispatch(Breedscreate({ id,breedTypeId,breedName,description }));
      if (Breedscreate.fulfilled.match(response)) {
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
            dispatch(Breedget())

      } else if (Breedscreate.rejected.match(response)) {
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
 
  
 const breedtypes=useSelector((state)=>state.BreedTypeget)
 console.log("breedtypes",breedtypes)
 const breedds=breedtypes?.data?.data
 console.log("breedds",breedds)

  useEffect(()=>{
  dispatch(Breedtype())
  },[])

  const breedgetdt=useSelector((state)=>state.Breedget)
  console.log("breedgetdt",breedgetdt)
  const breddt=breedgetdt?.data?.data
  console.log("breddt",breddt)

  const breedgetload=useSelector((state)=>state.Breedget.loading)
  console.log("breedgetload",breedgetload)

  useEffect(()=>{
    dispatch(Breedget())
  },[])

  
 const toastup=useSelector((state)=>state.BreedUpdate)
 const toastupdt=toastup?.data?.data
 console.log("toastupdt",toastupdt)

  const handleClickUpdate = (val) => {
    setError('')
    setopenUpdate(true);
    setId(val.id)
    dispatch(Breedfetch(val.id))
    setBreedTypeId(val.breedTypeId)
    console.log("val.breedTypeId",val.breedTypeName)
    setBreedName(val.breedName)
    setDescription(val.descriptions)
    

  };
  const handleCloseUpdate = async() => {
    const newError={};
    if(!breedTypeId)newError.breedTypeId="required";
    if(!breedName)newError.breedName="required";
    if(!description)newError.description="required";
    
    setError(newError);
    if(Object.keys(newError).length===0){
    // dispatch(BreedUpdate({id,breedTypeId,breedName,description})).then(()=>{
    //   console.log("BreedUpdate",id,breedName,breedTypeId,description)
    //   dispatch(Breedget())
  
    //   setopenUpdate(false);
    // })
    try {
      const response = await dispatch(BreedUpdate({ id,breedTypeId,breedName,description }));
      if (BreedUpdate.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setopenUpdate(false)
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
            dispatch(Breedget())

      } else if (BreedUpdate.rejected.match(response)) {
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
 

  const toastdlt=useSelector((state)=>state.BreedDelete)
  const toastdt=toastdlt?.data?.data
  console.log("toastdt",toastdt)

  const toastdlterr=useSelector((state)=>state.BreedDelete)
  const toasterr=toastdlterr?.error?.error?.reason
  console.log("toasterr",toasterr)


  const handleClickOpenDelete = (id) => {
    setbreedDelete(true);
    setId(id)
  };
  const handleCloseDelete = async() => {
    // setbreedDelete(false);
    // dispatch(Breeddelete(id)).then(()=>{
    //   dispatch(Breedget())
    
    // })
    try {
      const response = await dispatch(Breeddelete(id));
      if (Breeddelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setbreedDelete(false)
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
            dispatch(Breedget())

      } else if (Breeddelete.rejected.match(response)) {
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
    {breedgetload ?(
      <div style={overlayStyle}>
      <div style={{ textAlign: "center" }}>
          {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
          <BeatLoader
              loading={breedgetload}
              cssOverride={override}
              size={30}
              color={"#f8f9fa"}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
      </div>
  </div>) : (
      <div className="breed_Details">
        <div className="d-flex mt-2 mx-3 breed_Headerbutton">
          <h5 className="mt-4">Breed </h5>
          <button
            type="button"
            className="px-2 py-1 mt-4"
            onClick={handleClickOpenEdit}
          >
            + New Breed
          </button>
        </div>
        <div className="search d-flex justify-content-end mt-3 me-3">
        <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
          <input
            type="text"
            className="form-control-sm border border-light shadow fs-6 px-5 pe-1"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by Breed..."
          />
          </IconField>
        </div>
        <div className="table-responsive mt-3 mx-3">
          <table className="table mb-5">
            <thead className="table-primary">
              <tr>
                <th style={{ width: "30%" }}>S.no</th>
                <th style={{ width: "30%" }}> Type</th>
                <th style={{ width: "30%" }}> Name</th>
                <th style={{ width: "30%" }}>Action</th>
              </tr>
            </thead>
            
            <tbody>
              
            {/* {(breddt || [])
  .filter((val) => {
    if (search.toLowerCase() === '') return val; 
    return (
      val.breedName.toLowerCase().includes(search.toLowerCase()) || 
      val.breedTypeName.toLowerCase().includes(search.toLowerCase())
    );
  })
  .map((val, index) => ( */}
  {(() => {
    // Filter the data
    const filteredData = (breddt || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.breedName.toLowerCase().includes(search.toLowerCase())||
      val.breedTypeName.toLowerCase().includes(search.toLowerCase())

    });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{val?.breedTypeName}</td>
                <td>{val?.breedName}</td>
                <td className="editDeleteIcons">
                  <span
                    className="breed_editicon px-2 py-1"
                    onClick={()=>handleClickUpdate(val)}
                  >
                    {/* <FaRegEdit size={18} color="#1db9aa" /> */}
                  <i className="fa-solid fa-pen-to-square fs-6 mt-1 " style={{cursor:"pointer"}}></i>

                  </span>
                  <span className="breed_editdelete  px-2 py-1" 
                data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleClickOpenDelete(val.id)}>
                  
                    {/* <RiDeleteBinLine size={18} color=" #e63c3c" /> */}
                    <i className="fa-regular fa-trash-can fs-6 me-3" style={{cursor:"pointer"}}></i>
                  </span>
                </td>
              </tr>
              ))}
              return (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
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
      {/* .................................Breed create...................... */}
      <div>
        <BootstrapDialog
          // onClose={()=>setOpenEdit(false)}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2,fontSize:16, }} id="customized-dialog-title">
            <header>Breed</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={()=>setOpenEdit(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              fontSize:9,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent >
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-2">Type<span style={{color:"red"}}>*</span> </label>
              <select
                id="breedTypeId"
                className="form-control mt-2 mb-2"
                name="breedTypeId"
                // value={resData?.product}
                value={breedTypeId}
                onChange={handleChangebreedtype}
                // placeholder="Select Type"
              >
                  <option value="select type">select type</option>  
                {breedds?.map((item) => {
                // return <option value={item?.id}>{item?.categoryName}</option>;
                return (
                  <option key={item.id} value={item?.id}>
                    {item?.breedType}
                  </option>
                );
              })}
                {/* <option value="Cow">Cow</option>
                <option value="Dog">Dog</option>
                <option value="Duck">Duck</option> */}
              </select>
              {error.breedTypeId ?(<p style={{color:"red"}}>{error.breedTypeId}</p>):("")}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-1">
                Breed Name<span style={{color:"red"}}>*</span>
              </label>
              <input
                type="text"
                id="breedName"
                className="form-control mt-2 mb-2"
                name="breedName"
                
                value={breedName}
                onChange={handleChangebreedName}
                placeholder="Breed Name"
                autoComplete="off"
              />
              {error.breedName ?(<p style={{color:"red"}}>{error.breedName}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-1">
                Description<span style={{color:"red"}}>*</span>
              </label>
              <input
                type="text"
                id="description"
                className="form-control mt-2 mb-2"
                name="description"
              
                value={description}
                onChange={handleChangebreeddes}
                placeholder="Description"
                autoComplete="off"
              />
              {error.description ?(<p style={{color:"red"}}>{error.description}</p>):("")}

            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleCloseEdit}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

       {/* delete modal ........................................... */}
       <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content" style={{ padding: '10px', maxHeight: '200px' }}>
      <div className="modal-header" style={{ padding: '5px' }}>
        <h6 className="modal-title">Delete Breed</h6>
        <button type="button" className="btn-close fa fa-xmark" data-bs-dismiss="modal"style={{fontSize:"12px",fontWeight:"500px"}}></button>
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


      {/* ................................Breed Update ..................... */}
      <div>
        <BootstrapDialog
          // onClose={()=>setopenUpdate(false)}
          aria-labelledby="customized-dialog-title"
          open={openUpdate}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2,fontSize:16,  }} id="customized-dialog-title">
            <header>Breed</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={()=>setopenUpdate(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent >
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-1">
                Type<span style={{color:"red"}}>*</span>
              </label>
              <select
                id="breedTypeId"
                className="form-control mt-1 "
                name="breedTypeId"
                // value={resData?.product}
                value={breedTypeId}
                onChange={handleChangebreedtype}
                placeholder="Select Type"
              >
                <option value="">Select type</option>
                {breedds?.map((item) => {
                // return <option value={item?.id}>{item?.categoryName}</option>;
                return (
                  <option key={item.id} value={item?.id}>
                    {item?.breedType}
                  </option>
                );
              })}
                {/* <option value="Cow">Cow</option>
                <option value="Dog">Dog</option>
                <option value="Duck">Duck</option> */}
              </select>
              {error.breedTypeId ?(<p style={{color:"red"}}>{error.breedTypeId}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-1">
                Breed Name<span style={{color:"red"}}>*</span>
              </label>
              <input
                type="text"
                id="breedName"
                className="form-control mt-2 "
                name="breedName"
                // value={resData?.product}
                value={breedName}
                onChange={handleChangebreedName}
                placeholder="Breed Name"
                autoComplete="off"
              />
              {error.breedName ?(<p style={{color:"red"}}>{error.breedName}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor=" Type" className="mt-1">
                Description<span style={{color:"red"}}>*</span>
              </label>
              <input
                type="text"
                id="description"
                className="form-control mt-2 mb-2"
                name="description"
                // value={resData?.product}
                value={description}
                onChange={handleChangebreeddes}
                placeholder="Description"
                autoComplete="off"
              />
              {error.description ?(<p style={{color:"red"}}>{error.description}</p>):("")}

            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleCloseUpdate}>
              UPDATE
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Breed;
