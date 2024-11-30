import React, { useEffect, useState } from "react";
import "./product.css";
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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { productCreate } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductPostThunk";
import { productCategoryGet } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductCategoryGet";
import { poultryget } from "../../Redux/Thunk/MasterThunk/Poultry/PoultryGetThunk";
import { productBreedGet } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductBreedGetIdThunk";
import { productGet } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductGetThunk";
import { productDelete } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductDeleteThunk";
import { productFetch } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductFetchThunk";
import { productUpdate } from "../../Redux/Thunk/MasterThunk/ProductThunk/ProductUpdateThunk";
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

const Product = () => {

 const dispatch=useDispatch()

  const[productName,setProductName]=useState("");
  const[categoryId,setCategoryId]=useState("");
  const[quantity,setQuantity]=useState("");
  const[price,setPrice]=useState("");
  const[poultryId,setPoultryId]=useState("");
  const[breedId,setBreedId]=useState("");
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const[search,setSearch]=useState('')
  const[status,setStatus]=useState("ACTIVE")


  const [openEdit, setOpenedit] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [productDeletes, setproductDeletes] = useState(false);

  const handleChangeproductName = (e) =>{
    setProductName(e.target.value)
    if(e.target.value){
      setError((name) => ({...name,productName:""}))
    }
  };
  const handleChangecategoryId=(e)=>{
    setCategoryId(e.target.value)
    if(e.target.value){
      setError((name)=>({...name,categoryId:""}))
    }
  };
  const handleChangequantity=(e)=>{
    setQuantity(e.target.value)
    if(e.target.value){
      setError((name)=>({...name,quantity:""}))
    }
  };

  const handleChangeprice=(e)=>{
    setPrice(e.target.value)
    if(e.target.value){
      setError((name)=>({...name,price:""}))
    }
  };

  const productToastCrteMs=useSelector((state)=>state.ProductPost)
  const productToastCrte=productToastCrteMs?.data?.data
  console.log("productToastCrte",productToastCrte)

  const productToastCrtErr=useSelector((state)=>state.ProductPost)
  console.log("productToastCrtErr",productToastCrtErr)
  const productToastErr=productToastCrtErr?.error?.error?.reason
  console.log("productToastErr",productToastErr)


  const handleClickOpenEdit = () => {
    setOpenedit(true);
    setProductName("")
    setCategoryId("")
    setQuantity("")
    setPrice("")
    setPoultryId("")
    setBreedId("")
    setError("")
    setId("")
  };
  const handleCloseEdit = async() => {
    const newError = {};
    if (!productName) newError.productName = "requierd";
    if (!categoryId) newError.categoryId = "required";
    if (!quantity) newError.quantity = "required";
    if (!price) newError.price = "required";
    if (!poultryId) newError.poultryId = "required";
    if (!breedId) newError.breedId = "required";
    setError(newError);

    if (Object.keys(newError).length === 0) {
  //   dispatch(productCreate({id,productName,categoryId,quantity,price,poultryId,breedId,status})).then(()=>{
  //   setOpenedit(false);
  // dispatch(productGet())

  //   })
  try {
    const response = await dispatch(productCreate({ id,productName,categoryId,quantity,price,poultryId,breedId,status  }));
    if (productCreate.fulfilled.match(response)) {
      const success = response.payload.data
      console.log("success", success);
      setOpenedit(false)
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
          dispatch(productGet())

    } else if (productCreate.rejected.match(response)) {
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

 

  

const productCateDt=useSelector((state)=>state.ProductCategoryGet)
const productCateGet=productCateDt?.data?.data
console.log("productCateGet",productCateGet)

const proPoultryget=useSelector((state)=>state.PoultryGet)
const proPoulGet=proPoultryget?.data?.data
console.log("proPoulGet",proPoulGet)

const proBreedGet=useSelector((state)=>state.ProductBreedGet)
const productBreedGetms=proBreedGet?.data?.data
console.log("productBreedGetms",productBreedGetms)

const productGetDt=useSelector((state)=>state.ProductGet)
const ProGetDt=productGetDt?.data?.data
console.log("ProGetDt",ProGetDt)

const productGetload=useSelector((state)=>state.ProductGet.loading)
console.log("productGetload",productGetload)

useEffect(()=>{
  dispatch(productCategoryGet())
  dispatch(poultryget())
  dispatch(productGet())

},[])

  const proUpdateToast=useSelector((state)=>state.ProductUpdate)
  const proUpdateToastMss=proUpdateToast?.data?.data
  console.log("proUpdateToastMss",proUpdateToastMss)

  const handleClickOpenUpdate = (val) => {
    setError("")

   setOpenUpdate(true);
    dispatch(productFetch(val.id))
    setId(val.id)

    setProductName(val.productName)
    console.log("val.productName",val.productName)
    setCategoryId(val.categoryId)
    console.log("val.categoryId",val.categoryId)
    setQuantity(val.quantity)
    console.log("val.quantity",val.quantity)

    setPrice(val.price)
    console.log("val.price",val.price)

    handleChangePoultry(val.poultryId)
    console.log("val.poultryId",val.poultryId)

    handleChangeBreed(val.breedId)
    console.log("val.breedId",val.breedId)

  };
  const handleCloseUpdate = async () => {
    const newError = {};
    if (!productName) newError.productName = "requierd";
    if (!categoryId) newError.categoryId = "required";
    if (!quantity) newError.quantity = "required";
    if (!price) newError.price = "required";
    if (!poultryId) newError.poultryId = "required";
    if (!breedId) newError.breedId = "required";
    setError(newError);

    if (Object.keys(newError).length === 0) {
    setOpenUpdate(false);

    try{
      const response = await dispatch(productUpdate({id,productName,categoryId,quantity,price,poultryId,breedId,status}))
      if(productUpdate.fulfilled.match(response)){
        const successMsg = response.payload.data
        console.log('successMsg',successMsg)
        dispatch(productGet())
        setOpenUpdate(false)

        toast.success(successMsg, {
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
      else if(productUpdate.rejected.match(response)){
        const errorMsg = response.payload.error.reason
        console.log('errorMsg',errorMsg)
        setOpenUpdate(true)

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

    }catch(err){
      console.error(err)
    }
   
  //   dispatch(productUpdate({id,productName,categoryId,quantity,price,poultryId,breedId,status})).then(()=>{
  //   // console.log("dis",id,  productName,categoryId,quantity,price,poultryId,breedId)

  //   toast.success('Product updated successfully', {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  // });
  //   dispatch(productGet())

  // })
    }
    
  };
  // useEffect(()=>{
  // if(proUpdateToastMss){
  //   toast.success(proUpdateToastMss, {
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
  // },[proUpdateToastMss])


  const productToastDltMs=useSelector((state)=>state.ProductDelete)
  const productToastDlt=productToastDltMs?.data?.data
  console.log("productToastDlt",productToastDlt)

  const productToastDltErr=useSelector((state)=>state.ProductDelete)
  const productToastDltEr=productToastDltErr?.error?.error?.reason
  console.log("productToastDltEr",productToastDltEr)


  const handleClickOpenDelete = (id) => {
    setproductDeletes(true);
    setId(id)
    console.log("dlt",id)
  };
  const handleCloseDelete =async () => {
    // setproductDeletes(false);
    // dispatch(productDelete(id)).then(()=>{
    // dispatch(productGet())
    // })

    // console.log("dltAp",id)
    try {
      const response = await dispatch(productDelete(id));
      if (productDelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setproductDeletes(false)
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
            dispatch(productGet())
  
      } else if (productDelete.rejected.match(response)) {
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
 
  
  const handleChangePoultry = (id) => {
    dispatch(productBreedGet(id))
     setPoultryId(id)
     console.log("poul",id)
    setError((name)=>({...name,poultryId:""}))
   
  }
  
  const handleChangeBreed = (id) =>{
      setBreedId(id)
      console.log("idbreed",id)
    
      setError((name)=>({...name,breedId:""}))
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
    {productGetload ?(
     <div style={overlayStyle}>
     <div style={{ textAlign: "center" }}>
         {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
         <BeatLoader
             loading={productGetload}
             cssOverride={override}
             size={30}
             color={"#f8f9fa"}
             aria-label="Loading Spinner"
             data-testid="loader"
         />
     </div>
 </div>) : (
      <div className="product_Details">
        <div className="d-flex mt-2 mx-3 product_Headerbutton">
          <h5 className="mt-4">Product</h5>
          <button
            type="button"
            className="px-2 py-1 mt-4"
            onClick={handleClickOpenEdit}
          >
            + New Product
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
            placeholder="Search by Product..."
          />
          </IconField>
        </div>
        <div className="table-responsive mt-3 mx-3">
          <table className="table mb-5">
            <thead className="table-primary">
              <tr>
                <th>S.no</th>
                <th>Product </th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Poultry</th>
                <th>Breed</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
  {(() => {
    // Filter the data
    const filteredData = (ProGetDt || []).filter((val) => {
      if (search.toLowerCase() === '') return val;
      return (
        val.productName.toLowerCase().includes(search.toLowerCase()) || 
        val.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        val.poultryName.toLowerCase().includes(search.toLowerCase()) ||
        val.breedName.toLowerCase().includes(search.toLowerCase())
      );
    });

    // If there's filtered data, render it
    if (filteredData.length > 0) {
      return filteredData.map((val, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val?.productName}</td>
          <td>{val?.categoryName}</td>
          <td>{val?.quantity}</td>
          <td>{val?.price}</td>
          <td>{val?.poultryName}</td>
          <td>{val?.breedName}</td>
          <td className="editDeleteIcons">
            <span
              className="product_editicon px-2 py-1"
              onClick={() => handleClickOpenUpdate(val)}
            >
              <i
                className="fa-solid fa-pen-to-square fs-6 mt-1"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
            <span
              className="product_editdelete px-2 py-1"
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
        <td colSpan="8" style={{ textAlign: "center" }}>
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

      {/* create modal........................................................................................... */}

      <div>
        <BootstrapDialog
          // onClose={handleCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
         
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2,fontSize:19,}} id="customized-dialog-title">
            <header>Product</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={()=>setOpenedit(false)}
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
              <label htmlFor="Product  ">Product <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                id="productName"
                className="form-control"
                name="productName"
                // value={resData?.product}
                value={productName}
                onChange={handleChangeproductName}
                placeholder="Product "
                autoComplete="off"
              />
              {error.productName ? (
              <p style={{ color: "red" }}>{error.productName} </p>
            ) : (
              ""
            )}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Category" className="mt-2">Category<span style={{color:"red"}}>*</span></label>
              <select
                id="categoryId"
                className="form-control"
                name="categoryId"
                // value={resData?.product}
                value={categoryId}
                onChange={handleChangecategoryId}
                placeholder=" Select Category "
              >
                <option value="">Select Category</option>
                {productCateGet?.map((item)=>{
                  return(
                  <option key={item.id} value={item?.id}>{item.category}</option>
                  )
                })}

                
              </select>
              {error.categoryId ? (
              <p style={{ color: "red" }}>{error.categoryId} </p>
            ) : (
              ""
            )}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Quanatity"className="mt-1">Quanatity<span style={{color:"red"}}>*</span></label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                name="quantity"
                // value={resData?.product}
                value={quantity}
                onChange={handleChangequantity}
                placeholder="Quanatity"
              />
              {error.quantity ? (
              <p style={{ color: "red" }}>{error.quantity} </p>
            ) : (
              ""
            )}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Rate "className="mt-2">Rate<span style={{color:"red"}}>*</span></label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="price"
                value={price}
                onChange={handleChangeprice}
                placeholder="Rate"
              />
               {error.price ? (
              <p style={{ color: "red" }}>{error.price} </p>
            ) : (
              ""
            )}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Poultry "className="mt-2">Poultry<span style={{color:"red"}}>*</span></label>
              <select
                name="poultryId"
                className="form-control"
                id="poultryId"
                value={poultryId}
                onChange={(e) =>handleChangePoultry(e.target.value)}
              >
                <option value=""  >Select Poultry</option>
                {proPoulGet?.map((item)=>{
                 return(
                  <option key={item.id} value={item?.id}>{item?.poultryName}</option>
                 )
                })}
                
              </select>
              {error.poultryId ? (
              <p style={{ color: "red" }}>{error.poultryId} </p>
            ) : (
              ""
            )}
            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Breed "className="mt-2">Breed <span style={{color:"red"}}>*</span></label>
              <select
                name="breedId"
                className="form-control"
                id="breedId"
                value={breedId}
                onChange={(e)=>handleChangeBreed(e.target.value)}
                

                // disabled={!poultryId}
              >
                <option value="" >Select Breed </option>
                {productBreedGetms?.map((item)=>{
                  return(
                    <option key={item.id} value={item?.breedId}>{item?.breedName}</option>
                  )
                })}
               
              </select>
              {error.breedId ? (
              <p style={{ color: "red" }}>{error.breedId} </p>
            ) : (
              ""
            )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleCloseEdit}>
              SUBMIT
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
       {/* delete modal .............................. */}
     <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content" style={{ padding: '10px', maxHeight: '200px' }}>
      <div className="modal-header" style={{ padding: '5px' }}>
        <h6 className="modal-title">Delete Product</h6>
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
      {/* ......................................update modal..................................... */}
      <div>
        <BootstrapDialog
          // onClose={handleCloseUpdate}
          aria-labelledby="customized-dialog-title"
          open={openUpdate}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
           <header>Product</header> 
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={()=>setOpenUpdate(false)}
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
              <label htmlFor="Product">Product <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                id="productName"
                className="form-control"
                name="productName"
                // value={resData?.product}
                value={productName}
                onChange={handleChangeproductName}
                placeholder="Product "
                autoComplete="off"
              />
          {error.productName ?(<p style={{color:"red"}}>{error.productName}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Category  "className="mt-2">Category <span style={{color:"red"}}>*</span></label>
              <select
                id="categoryId"
                className="form-control"
                name="categoryId"
                // value={resData?.product}
                value={categoryId}
                onChange={handleChangecategoryId}
                placeholder=" Select Category "
              >
                <option value="">Select Category</option>
                {productCateGet?.map((item)=>{
                  return(
                  <option key={item.id} value={item?.id}>{item.category}</option>
                  )
                })}
                
              </select>
          {error.categoryId ?(<p style={{color:"red"}}>{error.categoryId}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Quanatity "className="mt-2">Quanatity<span style={{color:"red"}}>*</span></label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                name="quantity"
                // value={resData?.product}
                value={quantity}
                onChange={handleChangequantity}
                placeholder="Quanatity"
              />
          {error.quantity ?(<p style={{color:"red"}}>{error.quantity}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Rate "className="mt-2">Rate<span style={{color:"red"}}>*</span></label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="price"
                value={price}
                onChange={handleChangeprice}
                placeholder="Rate"
              />
          {error.price ?(<p style={{color:"red"}}>{error.price}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Poultry "className="mt-2">Poultry<span style={{color:"red"}}>*</span></label>
              <select
                name="poultryId"
                className="form-control"
                id="poultryId"
                value={poultryId}
                onChange={(e)=>handleChangePoultry(e.target.value)}
              >
                <option value="">Select Poultry</option>

                {proPoulGet?.map((item)=>{
                 return(
                  <option key={item.id} value={item?.id}>{item?.poultryName}</option>
                 )
                })}
              </select>
          {error.poultryId ?(<p style={{color:"red"}}>{error.poultryId}</p>):("")}

            </Typography>
            <Typography gutterBottom>
              <label htmlFor="Breed  "className="mt-2">Breed <span style={{color:"red"}}>*</span></label>
              <select
                name="breedId"
                className="form-control"
                id="breedId"
                value={breedId}
                onChange={(e)=>handleChangeBreed(e.target.value)}
              >
                <option value="">Select Breed </option>
                {productBreedGetms?.map((item)=>{
                  return(
                    <option key={item.id} value={item?.breedId}>{item?.breedName}</option>
                  )
                })}
                
              </select>
          {error.breedId ?(<p style={{color:"red"}}>{error.breedId}</p>):("")}

            </Typography>
          </DialogContent>
          <DialogActions>
            <Button  variant="contained" onClick={()=>handleCloseUpdate()}>
              Update
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Product;
