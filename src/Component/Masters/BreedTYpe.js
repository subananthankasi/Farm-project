import React, { useEffect, useState } from "react";
import "./breedType.css";
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
import { object } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreedtypeCreate } from "../../Redux/Thunk/MasterThunk/Breedtype/BreedTypePostThunk";
import { Breedtypeget } from "../../Redux/Thunk/MasterThunk/Breedtype/BreedtypeGetThunk";
import { BreedtypeDelete } from "../../Redux/Thunk/MasterThunk/Breedtype/BreedtypeDeleteThunk";
import { BreedtypeUpdate } from "../../Redux/Thunk/MasterThunk/Breedtype/BreedtypeUpdateThunk";
import { BreedtypeFetchGet } from "../../Redux/Thunk/MasterThunk/Breedtype/BreedtypegetFetchThunk";
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

const BreedTYpe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [breedType, setBreedType] = useState("");
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  console.log("search",search)



  const [openEdit, setOpenEdit] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const toastmessage = useSelector((state) => state.BreedTypeCreates?.data?.data)
  console.log("toastmessage", toastmessage)
  const toastmessageerr = useSelector((state) => state.BreedTypeCreates?.error?.reason)
  console.log("toastmessageerr",toastmessageerr)

  // const toastdatas=toastmessage?.data?.data
  // console.log("toastdata".toastdatas)
  // required ......................................................................
  const handleChangeproductName = (e) => {
    setBreedType(e.target.value)
    if (e.target.value) {
      setError((name) => ({ ...name, breedType: "" }))
    }
  };

const handleClickOpenEdit = () => {
    setOpenEdit(true);
    setBreedType("");
    setError("");
    setId("")
  };

 const handleCloseEdit = async() => {
   const newError = {};
    if (!breedType) newError.breedType = "required";
    setError(newError);
    if (Object.keys(newError).length === 0) {
      //  setOpenEdit(false);

      // dispatch(BreedtypeCreate({ id, breedType })).then(()=>{
      //   console.log("rukkuman", breedType);
      //   dispatch(Breedtypeget());
      // })
      try {
        const response = await dispatch(BreedtypeCreate({ id,breedType}));
        if (BreedtypeCreate.fulfilled.match(response)) {
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
              dispatch(Breedtypeget())

        } else if (BreedtypeCreate.rejected.match(response)) {
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
  

  const responseData = useSelector((state) => state?.BreedTypeGet?.data?.data);
  console.log(responseData, "responseData")
  const responseloading = useSelector((state) => state?.BreedTypeGet.loading);
  console.log(responseloading, "responseloading")

  useEffect(() => {
    dispatch(Breedtypeget());
  }, []);

  const updatetoastms = useSelector((state) => state.BreedTypeUpdate?.data?.data)
  console.log("updatetoastms", updatetoastms)
  const updateloading = useSelector((state) => state.BreedTypeUpdate.loading)
  console.log("updateloading",updateloading)


  const handleClickUpdate = (val) => {
    setError('')
    setId(val.id)
    setBreedType(val.breedType)
    console.log("val.breedType", val.breedType)
    dispatch(BreedtypeFetchGet(val.id));
   setopenUpdate(true);
  };

  const handleCloseUpdate = async() => {
    const newError = {};
    if (!breedType) newError.breedType = "required";
    setError(newError);
    if (Object.keys(newError).length === 0) {
    // dispatch(BreedtypeUpdate({ id, breedType })).then(()=>{
    //   dispatch(Breedtypeget());
    //   setopenUpdate(false);
    // })
    try {
      const response = await dispatch(BreedtypeUpdate({ id,breedType}));
      if (BreedtypeUpdate.fulfilled.match(response)) {
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
            dispatch(Breedtypeget())

      } else if (BreedtypeUpdate.rejected.match(response)) {
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

  
  const handleClickDelete = (id) => {
    setId(id); // Set the ID when delete button is clicked
    console.log("handleClickDelete", id);
  };
  const deletetoastms = useSelector((state) => state.BreedTypeDeleted?.data?.data)
  console.log("deletetoastms", deletetoastms)
  const deleteloading = useSelector((state) => state.BreedTypeDeleted.loading)
  console.log("deleteloading",deleteloading)
  const deletetoastmserrr = useSelector((state) => state.BreedTypeDeleted)
 console.log("deletetoastmserrr",deletetoastmserrr)
 const dlttoasterr=deletetoastmserrr?.error?.error?.reason
 console.log("dlttoasterr",dlttoasterr)


  const handleCloseDelete = async() => {
    // console.log("id",id)
    // if (deleteId) {
    //   dispatch(BreedtypeDelete(deleteId))
    //   console.log("ideees", deleteId);
    //   dispatch(Breedtypeget());
    // setDeleteId(null);
    // }
    try {
      const response = await dispatch(BreedtypeDelete( id));
      if (BreedtypeDelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setDeleteId(null)
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
            dispatch(Breedtypeget())

      } else if (BreedtypeDelete.rejected.match(response)) {
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
      {responseloading || deleteloading || updateloading ? ( 
        <div style={overlayStyle}>
                        <div style={{ textAlign: "center" }}>
                            {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
                            <BeatLoader
                                loading={responseloading}
                                cssOverride={override}
                                size={30}
                                color={"#f8f9fa"}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>) : (
        <div className="breedtype_Details">
          
          <div className="d-flex mt-2 mx-3 breedtype_Headerbutton">
            <h5 className="mt-4">Breed Type</h5>
            <button
              type="button"
              className="px-2 py-1 mt-4"
              onClick={handleClickOpenEdit}
            >
              + New BreedType
            </button>
          </div>
          <div className="search d-flex justify-content-end mt-3 me-3">
          <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
            <input
              type="text"
              className="form-control-sm border border-light shadow fs-6 px-5 pe-1"
              placeholder="Search by BreedType..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            </IconField>
          </div>
          <div className="table-responsive mt-3 mx-3">
            <table className="table mb-5">
              <thead className="table-primary">
                <tr>
                  <th style={{ width: "40%" }}>S.no</th>
                  <th style={{ width: "40%" }}>Breed Type</th>
                  <th style={{ width: "40%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
              {/* {(responseData || []).filter((val) => {
             return search.toLowerCase() === '' 
            ? val 
            : val.breedType.toLowerCase().includes(search);
             }).map((val, index) => ( */}
             {(() => {
    // Filter the data
    const filteredData = (responseData || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.breedType.toLowerCase().includes(search.toLowerCase())

    });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (


                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.breedType}</td>
                    <td className="editDeleteIcons">
                      <span
                        className="breedtype_editicon px-2 py-1"
                        onClick={() => handleClickUpdate(val)}
                      >
                        <i className="fa-solid fa-pen-to-square fs-6 mt-1 " style={{cursor:"pointer"}}></i>
                      </span>
                      <span
                        className="breedtype_editdelete  px-2 py-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => handleClickDelete(val.id)}
                      >
                        <i className="fa-regular fa-trash-can fs-6 me-3" style={{cursor:"pointer"}}></i>
                      </span>
                    </td>
                  </tr>
                ))}
            
              return (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
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
      )
      }
      {/* ........................................................create modal.................................. */}
      <div>
        <BootstrapDialog
          //  onClose={() => setOpenEdit(false)}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
           <header>Breed Type</header> 
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenEdit(false)}
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
              <label htmlFor="Breed  Type" className="mt-2">
                Breed Type<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="breedType"
                className="form-control mt-2 mb-3"
                name="breedType"
                // value={resData?.product}
                value={breedType}
                onChange={handleChangeproductName}
                placeholder="Breed Type"
                autoComplete="off"
              />
              {error.breedType ? (
                <p style={{ color: "red" }}>{error.breedType}</p>
              ) : (
                ""
              )}
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
          <div
            className="modal-content"
            style={{ padding: "10px", maxHeight: "200px" }}
          >
            <div className="modal-header" style={{ padding: "5px" }}>
              <h6 className="modal-title">Delete Breed Type</h6>
              <button
                type="button"
                className="btn-close fa fa-xmark"
                data-bs-dismiss="modal"
                style={{ fontSize: "12px", fontWeight: "500px" }}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ padding: "13px", fontSize: "14px" }}
            >
              Are you sure you want to delete..?
            </div>
            <div className="modal-footer" style={{ padding: "3px" }}>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleCloseDelete()}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* .............................................Update modal........................................ */}
      <div>
        <BootstrapDialog
          //  onClose={handleCloseUpdate}
          aria-labelledby="customized-dialog-title"
          open={openUpdate}
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
           <header>Breed Type</header> 
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setopenUpdate(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <label htmlFor="Breed  Type" className="mt-2">
                Breed Type<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="breedType"
                className="form-control mt-2 mb-3"
                name="breedType"
                value={breedType}
                onChange={ handleChangeproductName}
                placeholder="Breed Type"
                autoComplete="off"
              />
               {error.breedType ? (
                <p style={{ color: "red" }}>{error.breedType}</p>
              ) : (
                ""
              )}
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

export default BreedTYpe;
