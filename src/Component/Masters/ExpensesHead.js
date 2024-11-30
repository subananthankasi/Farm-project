import React, { useEffect, useState } from "react";
import "./expensesHead.css";
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
import { Expensescreate } from "../../Redux/Thunk/MasterThunk/ExpensesHeadThunk/ExpenPostThunk";
import { Expensesget } from "../../Redux/Thunk/MasterThunk/ExpensesHeadThunk/ExpenGetThunk";
import { ExpensesDelete } from "../../Redux/Thunk/MasterThunk/ExpensesHeadThunk/ExpenDeleteThunk";
import { Expensesupdate } from "../../Redux/Thunk/MasterThunk/ExpensesHeadThunk/ExpenUpadateThunk";
import { ExpensesFetch } from "../../Redux/Thunk/MasterThunk/ExpensesHeadThunk/ExpenFetchThunk";
import BeatLoader from "react-spinners/BeatLoader";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ExpensesHead = () => {
  const dispatch = useDispatch();
  const [expenseType, setExpenseType] = useState("");
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const[status,setStatus]=useState("ACTIVE")

  const [openEdit, setOpenEdit] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);
  const [expHeadDelete, setexpHeadDelete] = useState(false);

  const handlechangeExpen = (e) => {
    setExpenseType(e.target.value);
    if (e.target.value) {
      setError((name) => ({ ...name, expenseType: "" }));
    }
  };

  const createtoast = useSelector((state) => state.ExpensesCteate);
  console.log("createtoast", createtoast);
  const ctoastms = createtoast?.data?.data;
  console.log("ctoastms", ctoastms);
  const createtoaster = useSelector((state) => state.ExpensesCteate);
  const toasterr = createtoaster?.error?.error?.reason;
  console.log("toasterr", toasterr);

  const handleClickOpenEdit = () => {
    setExpenseType("");
    setError("");
    setOpenEdit(true);
    setId("")
  };
  const handleCloseEdit = async () => {
    const newError = {};
    if (!expenseType) newError.expenseType = "required*";
    setError(newError);
    if (Object.keys(newError).length === 0) {
      //   setOpenEdit(false)

      //   dispatch(Expensescreate({expenseType})).then(()=>{
      //  dispatch(Expensesget())

      //   console.log("expenseType",expenseType);
      //   })

      try {
        const response = await dispatch(Expensescreate({ id,expenseType,status  }));
        if (Expensescreate.fulfilled.match(response)) {
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
              dispatch(Expensesget())

        } else if (Expensescreate.rejected.match(response)) {
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
  // useEffect(() => {
  //   if (ctoastms) {
  //     //  setOpenEdit(false);

  //     toast.success(ctoastms, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [ctoastms]);

  // useEffect(() => {
  //   if (toasterr) {
  //     //  setOpenEdit(true);

  //     toast.error(toasterr, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [toasterr]);

  const expenresget = useSelector((state) => state.ExpensesGet);
  console.log("expenresponse", expenresget);
  const expendata = expenresget?.data?.data;
  console.log("expendata", expendata);
  const expengetloading = useSelector((state) => state.ExpensesGet.loading);

  useEffect(() => {
    dispatch(Expensesget());
  }, []);

  const uptoastms = useSelector((state) => state.ExpensesUpdate);
  const uptoastdts = uptoastms?.data?.data;
  console.log("uptoastdts", uptoastdts);
  const uptoastmsEr = useSelector((state) => state.ExpensesUpdate?.data);
  console.log("uptoastmsEr", uptoastmsEr);
  const expenUpToastErr = uptoastmsEr?.error;
  console.log("expenUpToastErr", expenUpToastErr);

  const handleClickUpdate = (val) => {
    setError("");
    setopenUpdate(true);
    dispatch(ExpensesFetch(val.id));
    setExpenseType(val.expenseType);
    setId(val.id);
  };
  const handleCloseUpdate = async() => {
    const newError = {};
    if (!expenseType) newError.expenseType = "required*";
    setError(newError);
    if (Object.keys(newError).length === 0) {
      // setopenUpdate(false);
      // dispatch(Expensesupdate({ id, expenseType,status})).then(() => {
      //   dispatch(Expensesget());
      // });
      try {
        const response = await dispatch(Expensesupdate({ id,expenseType,status  }));
        if (Expensesupdate.fulfilled.match(response)) {
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
              dispatch(Expensesget())

        } else if (Expensesupdate.rejected.match(response)) {
          const errorMsgUp = response.payload.error.reason
          console.log("errorMsgUp", errorMsgUp);
          
          toast.error(errorMsgUp, {
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
  // useEffect(() => {
  //   if (uptoastdts) {
  //     // setopenUpdate(false);

  //     toast.success(uptoastdts, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [uptoastdts]);
  // useEffect(() => {
  //   // setopenUpdate(true);

  //   if (expenUpToastErr) {
  //     toast.error(expenUpToastErr, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [expenUpToastErr]);

  const dlttoast = useSelector((state) => state.ExpensesDelete);
  const dlttoastdt = dlttoast?.data?.data;
  console.log("dlttoastdt", dlttoastdt);
  const dlttoaster = useSelector((state) => state.ExpensesDelete);
  const errtoast = dlttoaster?.error?.error?.reason;
  console.log("errtoast", errtoast);

  const handleClickOpenDelete = (id) => {
    setId(id);
    setexpHeadDelete(true);
  };
  const handleCloseDelete = async() => {
    // setexpHeadDelete(false);
    // dispatch(ExpensesDelete(id)).then(() => {
    //   dispatch(Expensesget());
    // });
    try {
      const response = await dispatch(ExpensesDelete( id));
      if (ExpensesDelete.fulfilled.match(response)) {
        const success = response.payload.data
        console.log("success", success);
        setexpHeadDelete(false)
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
            dispatch(Expensesget())

      } else if (ExpensesDelete.rejected.match(response)) {
        const errorMsgdlt = response.payload.error.reason
        console.log("errorMsgdlt", errorMsgdlt);
        
        toast.error(errorMsgdlt, {
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
  // useEffect(() => {
  //   if (dlttoastdt) {
  //     toast.success(dlttoastdt, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [dlttoastdt]);

  // useEffect(() => {
  //   if (errtoast) {
  //     toast.error(errtoast, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }, [errtoast]);

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
      {expengetloading ? (
        <div style={overlayStyle}>
          <div style={{ textAlign: "center" }}>
            {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
            <BeatLoader
              loading={expengetloading}
              cssOverride={override}
              size={30}
              color={"#f8f9fa"}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div className="expenses_Details">
          <div className="d-flex mt-2 mx-3 expenses_Headerbutton">
            <h5 className="mt-4">Expense Head</h5>
            <button
              type="button"
              className="px-2 py-1 mt-4"
              onClick={handleClickOpenEdit}
            >
              + New ExpenseHead
            </button>
          </div>
          <div className="search d-flex justify-content-end mt-3 me-3">
          <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
            <input
              type="search"
              className="form-control-sm border border-light shadow fs-6 px-5 pe-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ExpenseHead..."
          />
            </IconField>

          </div>
          <div className="table-responsive mt-3 mx-3">
            <table className="table mb-5">
              <thead className="table-primary">
                <tr>
                  <th style={{ width: "40%" }}>S.no</th>
                  <th style={{ width: "40%" }}>Expense Head</th>
                  <th style={{ width: "40%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
  {expendata && expendata.length > 0 ? (
    expendata
      .filter((val) => {
        return search.toLowerCase() === "" || val.expenseType.toLowerCase().includes(search);
      })
      .length > 0 ? (
      expendata
        .filter((val) => {
          return search.toLowerCase() === "" || val.expenseType.toLowerCase().includes(search);
        })
        .map((val, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val?.expenseType}</td>
            <td className="editDeleteIcons">
              <span
                className="expenses_editicon px-2 py-1"
                onClick={() => handleClickUpdate(val)}
              >
                <i
                  className="fa-solid fa-pen-to-square fs-6 mt-1"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
              <span
                className="expenses_editdelete px-2 py-1"
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
        ))
    ) : (
      <tr>
        <td  colSpan="5" style={{ textAlign: "center" }}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>No Data Found</p>
        </td>
      </tr>
    )
  ) : (
    <tr>
      <td  colSpan="5" style={{ textAlign: "center" }}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>No Data Available</p>
      </td>
    </tr>
  )}
</tbody>
 </table>
          </div>
        </div>
      )}



      {/* ........................Edit Modal ........................... */}
      <div>
        <BootstrapDialog
          // onClose={() => setOpenEdit(false)}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
          
           fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
           <header> Expense Head</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenEdit(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              fontWeight:"bold",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <label htmlFor="Expense Type" className="mt-1">
                Expense Type<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="expenseType"
                className="form-control mt-2 mb-2"
                name="expenseType"
                value={expenseType}
                onChange={handlechangeExpen}
                placeholder="Expense Type"
                autoComplete="off"
              />
              {error.expenseType ? (
                <p style={{ color: "red" }}>{error.expenseType}</p>
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
              <h6 className="modal-title">Delete ExpensesHead</h6>
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

      {/* .........................Update Modal.......................... */}
      <div>
        <BootstrapDialog
          // onClose={() => setopenUpdate(false)}
          aria-labelledby="customized-dialog-title"
          open={openUpdate}
          
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
           <header>Expense Head</header> 
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
          <DialogContent >
            <Typography gutterBottom>
              <label htmlFor="Expense Type" className="mt-1">
                Expense Type<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="expenseType"
                className="form-control mt-2 mb-2"
                name="expenseType"
                // value={resData?.product}
                value={expenseType}
                onChange={handlechangeExpen}
                placeholder="Expense Type"
                autoComplete="off"

              />
              {error.expenseType ? (
                <p style={{ color: "red" }}>{error.expenseType}</p>
              ) : (
                ""
              )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleCloseUpdate}>
              Update
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default ExpensesHead;
