import React, { useEffect, useState } from 'react'
import "./user.css";
import { FaRegEdit } from "react-icons/fa";
 import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
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
import { userGet } from '../../Redux/Thunk/MasterThunk/User/UserGetThunk';
import { userDelete } from '../../Redux/Thunk/MasterThunk/User/UserDeletehunk';
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

const User = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[fullName,setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[phoneNo,setPhoneNo]=useState("");
  const[address,setAddress]=useState("");
  const[userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const[userRoleId,setUserRoleId]=useState("");
  const[id,setId]=useState(null)
  const[search,setSearch]=useState("")


      // const [userDelete, setuserDelete] = useState(false);

      const userDltToastMs=useSelector((state)=>state.userDelete?.data?.data)
      console.log("userDltToastMs",userDltToastMs)

      const userDltToastEr=useSelector((state)=>state.userDelete)
      const userDltToastErr=userDltToastEr?.error?.error?.reason
      console.log("userDltToastErr",userDltToastErr)
      
       const handleClickOpenDelete = (id) => {
        // setuserDelete(true);
        setId(id)
       };
      const handleCloseDelete = async() => {
        // setuserDelete(false);
      //   dispatch(userDelete(id)).then(()=>{
      // dispatch(userGet())
       
      //   })
      try {
        const response = await dispatch(userDelete( id));
        if (userDelete.fulfilled.match(response)) {
          const success = response.payload.data
          console.log("success", success);
            //  setOpenEdit(false)
            // navigate('/user')
    
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
    
        } else if (userDelete.rejected.match(response)) {
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
   
    const userGetDt=useSelector((state)=>state.userGet?.data?.data)
    console.log("userGetDt",userGetDt)
 
    const userGetload=useSelector((state)=>state.userGet.loading)
   

    useEffect(()=>{
      dispatch(userGet())
    },[])

    const handleClickOpenEdit = (val) => {
       navigate('/userupdate', { state: { user:val } })
      //  setId(val.id)
      //  setFullName(val.fullName)
      //  setEmail(val.email)
      //  setPhoneNo(val.phoneNo)
      //  setAddress(val.address)
      //  setUserName(val.userName)
      //  setPassword(val.password)
      //  setUserRoleId(val.userRoleId)
      console.log("user:val", {user:val})
      console.log("val",val)
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
    {userGetload ?(
      <div style={overlayStyle}>
      <div style={{ textAlign: "center" }}>
          {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
          <BeatLoader
              loading={userGetload}
              cssOverride={override}
              size={30}
              color={"#f8f9fa"}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
      </div>
  </div>) : (
    <div className='user_Details'>
         <div className='d-flex mt-2 mx-3 user_Headerbutton'>
         <h5 className='mt-4'>User</h5>
         <Link to="/useredit">
          <button type="button" className='px-2 py-1 mt-4' >+ New User</button>
          </Link>
         </div>
         <div className=' search d-flex justify-content-end mt-3 me-3'>
         <IconField iconPosition="left">
         <InputIcon className="pi pi-search" />
            <input type='text' 
            className='form-control-sm border border-light shadow fs-6 px-5 pe-1' 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search by User...' />
            </IconField>
         </div>
         <div className='table-responsive mt-3 mx-3'>
        <table className='table mb-5'>
            <thead className='table-primary'>
                <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>Action</th>
                    
                
                </tr>
            </thead>
            <tbody>
              
                  {/* {(userGetDt || [])
                    .filter((val) => {
                      if (search.toLowerCase() === '') return val; 
                      return (
                        val.fullName.toLowerCase().includes(search.toLowerCase()) || 
                        val.address.toLowerCase().includes(search.toLowerCase())||
                        val.email.toLowerCase().includes(search.toLowerCase())

                      );
                    })
                    .map((val, index) => ( */}

{(() => {
    // Filter the data
    const filteredData = (userGetDt || []).filter((val) => {
      return search.toLowerCase() === '' 
        ? val 
        : val.fullName.toLowerCase().includes(search.toLowerCase())||
        val.address.toLowerCase().includes(search.toLowerCase())||
        val.email.toLowerCase().includes(search.toLowerCase())
 });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (

            <tr key={index}>
                <td>{index+1}</td>
                <td>{val?.fullName}</td>
                <td>{val?.email}</td>
                <td>{val?.address}</td>
                <td>{val?.phoneNo}</td>
                <td className='editDeleteIcons'><span className='user_editicon px-2 py-1'onClick={()=>handleClickOpenEdit(val)}>
                <i className="fa-solid fa-pen-to-square fs-6 mt-1 " style={{cursor:"pointer"}}></i>
                </span>
               <span className='user_editdelete  px-2 py-1'
                data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleClickOpenDelete(val.id)}>
               <i className="fa-regular fa-trash-can fs-6 me-3" style={{cursor:"pointer"}}></i></span></td>
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
        onClose={() => setuserDelete(false)}
        aria-labelledby="customized-dialog-title"
        open={userDelete}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete User
          <IconButton
            aria-label="close"
            onClick={() => setuserDelete(false)}
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
          <Button variant="contained" onClick={() => setuserDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={ handleCloseDelete}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
      <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content" style={{ padding: '10px', maxHeight: '200px' }}>
      <div className="modal-header" style={{ padding: '5px' }}>
        <h6 className="modal-title">Delete User</h6>
        <button type="button" className="btn-close fa fa-xmark" data-bs-dismiss="modal"style={{fontSize:"12px",fontWeight:"500px"}}></button>
      </div>
      <div className="modal-body" style={{ padding: '13px', fontSize: '14px' }}>
        Are you sure you want to delete..?
      </div>
      <div className="modal-footer" style={{ padding: '3px',}}>
        <button type="button" className="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={handleCloseDelete}>OK</button>
      </div>
    </div>
  </div>
</div>
   </>
  )
}

export default User