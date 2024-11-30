import React, { useEffect, useState } from 'react'
import "./category.css";
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
import { categoryPost } from '../../Redux/Thunk/MasterThunk/CategoryThunk/CategoryPostThunk';
import { categoryget } from '../../Redux/Thunk/MasterThunk/CategoryThunk/CategoryGetThunk';
import { categorydelete } from '../../Redux/Thunk/MasterThunk/CategoryThunk/CategoryDeletedThunk';
import { catagoryFetch } from '../../Redux/Thunk/MasterThunk/CategoryThunk/CategoryFetchThunk';
import { categoryupdate } from '../../Redux/Thunk/MasterThunk/CategoryThunk/CategoryUpdateThunk';
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

const Category = () => {

  const dispatch=useDispatch();

  const[category,setCategory]=useState("");
  const[id,setId]=useState(null);
  const[status,setStatus]=useState("ACTIVE")
  const[error,setError]=useState("");
  const[search,setSearch]=useState("");


  
  const [openEdit, setOpenEdit] = useState(false);
  const [openUpdate,setopenUpdate]=useState(false);
  const [categoryDelete, setcategoryDelete] = useState(false);

 const handlechangeCategory=(e)=>{
  setCategory(e.target.value)
  if(e.target.value){
    setError((name)=>({...name,category:""}))
  }
 };
  const createtoast=useSelector((state)=>state.CategoryPost)
  console.log("createtoast",createtoast)
  const createtoastms=createtoast?.data?.data
  console.log("createtoastms",createtoastms)
  const createtoasterr=useSelector((state)=>state.CategoryPost)
  console.log("createtoasterr",createtoasterr)
  const Crtoasterr=createtoasterr?.error?.error?.reason
  console.log("Crtoasterr",Crtoasterr)


  const handleClickOpenEdit = () => {
    setError('')
    setCategory('')
    setOpenEdit(true);
    setId("")
  };
  const handleCloseEdit = async() => {
    const newError={};
    if(!category)newError.category="required";
    setError(newError);
    if(Object.keys(newError).length===0){
    // setOpenEdit(false);
    // dispatch(categoryPost({id,category,status})).then(()=>{
    //   console.log("category",category)
    //   dispatch(categoryget())
    // })
    try {
      const response = await dispatch(categoryPost({ id,category,status  }));
      if (categoryPost.fulfilled.match(response)) {
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
            dispatch(categoryget())

      } else if (categoryPost.rejected.match(response)) {
        const errorMsg= response.payload.error.reason
        console.log("errorMsg", errorMsg);
        
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
 
 
const cateresponse=useSelector((state)=>state.CategoryGet)
console.log("cateresponse",cateresponse)
const responsedata=cateresponse?.data?.data
console.log("responsedata",responsedata)
const cateload=useSelector((state)=>state.CategoryGet.loading);
console.log("cateload",cateload)


useEffect(()=>{
  dispatch(categoryget())
},[])

  //  const fetchdt=useSelector((state)=>state.CategoryFetch)
  //  console.log("fetchdt",fetchdt)
  //  const fetchdata=fetchdt?.data?.data?.category
  //  console.log("fetchdata",fetchdata)
  const toastms=useSelector((state)=>state.CategoryUpdate)
  console.log("toastms",toastms)
  const uptoastms=toastms?.data?.data
  console.log("uptoastms",uptoastms)
  const toastmsEr=useSelector((state)=>state.CategoryUpdate)
  console.log("toastmsEr",toastmsEr)
  const cateToastMsErr=toastmsEr?.error?.error?.reason
  console.log("cateToastMsErr",cateToastMsErr)

  const handleClickUpdate=(val)=>{
    setError("")
    setId(val.id)
    setCategory(val.category)
    dispatch(catagoryFetch(val.id))
    setopenUpdate(true);
  };
  const handleCloseUpdate =async()=>{
    const newError={};
    if(!category)newError.category="required";
    setError(newError);
    if(Object.keys(newError).length===0){
    // setopenUpdate(false);
    // dispatch(categoryupdate({id,category})).then(()=>{
    //   console.log("categoryupdate",category,id)
    //   dispatch(categoryget())
    // })
    try {
      const response = await dispatch(categoryupdate({ id,category,status  }));
      if (categoryupdate.fulfilled.match(response)) {
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
            dispatch(categoryget())

      } else if (categoryupdate.rejected.match(response)) {
        const errorMsg= response.payload.error.reason
        console.log("errorMsg", errorMsg);
        
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
 
 const dltoastms=useSelector((state)=>state.CategoryDelete)
 console.log("dltoastms",dltoastms)
 const dltoastmss=dltoastms?.data?.data
 console.log(dltoastmss)
 const dltoastmser=useSelector((state)=>state.CategoryDelete)
 const dlterrms=dltoastmser?.error?.error?.reason
 console.log("dlterrms",dlterrms)


  const handleClickOpenDelete = (id) => {
    setcategoryDelete(true);
    setId(id)
  };
  const handleCloseDelete =async () => {
  //  dispatch(categorydelete(id)).then(()=>{
  //   dispatch(categoryget())
   
  //  })
  try {
    const response = await dispatch(categorydelete(id));
    if (categorydelete.fulfilled.match(response)) {
      const success = response.payload.data
      console.log("success", success);
      setcategoryDelete(false)
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
          dispatch(categoryget())

    } else if (categorydelete.rejected.match(response)) {
      const errorMsg= response.payload.error.reason
      console.log("errorMsg", errorMsg);
      
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
    {cateload ?(
       <div style={overlayStyle}>
       <div style={{ textAlign: "center" }}>
           {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
           <BeatLoader
               loading={cateload}
               cssOverride={override}
               size={30}
               color={"#f8f9fa"}
               aria-label="Loading Spinner"
               data-testid="loader"
           />
       </div>
   </div>) : (
    <div className='category_Details'>
    <div className='d-flex mt-2 mx-3 category_Headerbutton'>
    <h5 className='mt-4'>Category</h5>
     <button type="button" className='px-2 py-1 mt-4' onClick={handleClickOpenEdit}>+ New Category</button>
    </div>
    <div className='search d-flex justify-content-end mt-3 me-3'>
    <IconField iconPosition="left">
    <InputIcon className="pi pi-search" />
       <input type='text' className='form-control-sm border border-light shadow fs-6 px-5 pe-1' 
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       placeholder='Search by Category...' />
       </IconField>
    </div>
    <div className='table-responsive mt-3 mx-3'>
   <table className='table'style={{marginBottom:"80px"}}>
       <thead className='table-primary'>
           <tr>
               <th style={{width:"40%"}}>S.no</th>
               <th style={{width:"40%"}}>Category</th>
               <th style={{width:"40%"}}>Action</th>
                </tr>
       </thead>
       <tbody>
  {(() => {
    // Filter the data
    const filteredData = (responsedata || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.category.toLowerCase().includes(search.toLowerCase());
    });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val?.category}</td>
          <td className="editDeleteIcons">
            <span className="category_editicon px-2 py-1" onClick={() => handleClickUpdate(val)}>
              <i
                className="fa-solid fa-pen-to-square fs-6 mt-1"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
            <span
              className="category_editdelete px-2 py-1"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={() => handleClickOpenDelete(val.id)}
            >
              <i
                className="fa-regular fa-trash-can fs-6 me-3"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
          </td>
        </tr>
      ));
    }

    // If no data is found, show "No Data Found"
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
    )}
{/* ..................................Create Modal.................. */}
<div>
      <BootstrapDialog
        // onClose={handleCloseEdit}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2,fontSize:17, }} id="customized-dialog-title">
          <header>Category</header>
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
        <DialogContent >
          <Typography gutterBottom>
          <label htmlFor="Category" className='mt-1'>Category<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              id="category"
              className="form-control mt-2 mb-2"
              name="category"
              // value={resData?.product}
              value={category}
              onChange={handlechangeCategory}
              placeholder='Category'
              autoComplete='off'
            />
          </Typography>
          {error.category ?(<p style={{color:"red"}}>{error.category}</p>):("")}
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
        <h6 className="modal-title">Delete Category</h6>
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

   
   {/* .........................Update Modal.......................... */}
   <div>
      <BootstrapDialog
        // onClose={handleCloseUpdate}
        aria-labelledby="customized-dialog-title"
        open={openUpdate}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2,fontSize:17,  }} id="customized-dialog-title">
         <header>Category</header> 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setopenUpdate(false)}
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
          <label htmlFor="Category" className='mt-1'>Category<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              id="category"
              className="form-control mt-2 mb-2"
              name="category"
              // value={resData?.product}
              value={category}
              onChange={handlechangeCategory}
              placeholder='Category'
              autoComplete='off'
            />
          {error.category ?(<p style={{color:"red"}}>{error.category}</p>):("")}

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

  )
}

export default Category