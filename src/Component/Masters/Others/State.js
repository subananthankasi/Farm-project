import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import * as yup from "yup";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import './State.css'
import { StateGetThunk } from '../../../Redux/Thunk/OthersThunk/State/StateGetThunk';
import { stateCreateGetThunk } from '../../../Redux/Thunk/OthersThunk/State/StateCreateGetThunk';
import { createStateThunk } from '../../../Redux/Thunk/OthersThunk/State/CreateThunk';
import { deleteStateThunk } from '../../../Redux/Thunk/OthersThunk/State/DeleteThunk';
import { fetchStateThunk } from '../../../Redux/Thunk/OthersThunk/State/FetchState';
import { updateStateThunk } from '../../../Redux/Thunk/OthersThunk/State/UpdateState';
import BeatLoader from "react-spinners/BeatLoader";




const State = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [stateDltId, setStateDltId] = useState(null)


    const closeDltModal = () => {
        toast.warn("You have rejected", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }


    const newState = () => {
        setVisible(true)
    }


    const stateGetLoading = useSelector((state) => state.StateGetData.loading)
    const stateCreateLoading = useSelector((state) => state.stateCreate.loading)


    const onSubmit = async (values) => {
        if (isEditing) {
            //Editing
            // console.log('Editing Values',values)
            const payload = {
                countryId: values.countryId,
                stateName: values.stateName,
                shortName: values.shortName,
                id: values.id,
                status: values.status,
            }
            try {
                const response = await dispatch(updateStateThunk(payload))
                if (updateStateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    // console.log('message', message)

                    setUpdateVisible(false);
                    formik1.resetForm();
                    dispatch(StateGetThunk());

                    toast.success('State updated successfully', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });

                } else if (updateStateThunk.rejected.match(response)) {
                    const errorPayload = response.payload.reason.response.data.error.reason
                    console.log('dispatch errorPayload :', errorPayload)

                    toast.error(errorPayload, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
            catch (error) {
                console.log(error)
            }
            // await dispatch(updateStateThunk(payload))
            // setUpdateVisible(false)
            // await dispatch(StateGetThunk())
            // toast.success("State  updated successfully.", {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //     transition: Bounce,
            // });
            // formik1.resetForm()
            // console.log('payloadeee',payload)
        } else {
            //Create
            // console.log('Create values:', values);
            try {
                const response = await dispatch(createStateThunk(values))
                if (createStateThunk.fulfilled.match(response)) {
                    setVisible(false);
                    formik1.resetForm()
                    dispatch(StateGetThunk())
                    toast.success('State created successfully', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
                else if (createStateThunk.rejected.match(response)) {
                    const createError = response.payload.reason.response.data.error
                    // console.log('createError  :', createError)

                    toast.error(createError, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }

            }
            catch (error) {
                console.log('create API Error', error)
            }

        }


    }

    const formik1 = useFormik({
        initialValues: {
            countryId: '',
            stateName: '',
            shortName: '',
            id: null,
            status: "ACTIVE"
        },
        validationSchema: yup.object().shape({
            countryId: yup.string().required("*required!!"),
            stateName: yup.string().required("*required!!"),
            shortName: yup.string().required("*required!!"),
        }),
        onSubmit

    })
    const onCloseModal = () => {
        if (visible) {
            setVisible(false);
            formik1.resetForm();
        }
    }
    const updateOnCloseModal = () => {
        if (updateVisible) {
            setUpdateVisible(false);
            formik1.resetForm();
        }
    }



    useEffect(() => {
        dispatch(StateGetThunk())
        dispatch(stateCreateGetThunk())

    }, [dispatch])

    const handleDelete = (id) => {
        setStateDltId(id)
    }

    const deleteState = async () => {
        try {

            const response = await dispatch(deleteStateThunk(stateDltId))
            if(deleteStateThunk.fulfilled.match(response)){
                const success = response.payload.data
                // console.log('success',success)
                toast.success("State deleted successfully.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                dispatch(StateGetThunk());
    
            }
            else if(deleteStateThunk.rejected.match(response)){
                const errorPayload = response.payload.reason.response.data.error.reason
                // console.log('errorPayload',errorPayload)
                
                toast.error(errorPayload, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                
            }
           
        } catch (error) {
            console.error("State country error:", error);
        }

    }
    const fetchStateData = useSelector((state) => state.fetchStateData?.data?.data)
    // console.log('fetchStateData',fetchStateData)

    const editState = (item) => {
        // console.log('editId', item)
        dispatch(fetchStateThunk(item))

        formik1.setFieldValue('countryId', item?.countryId || '');
        formik1.setFieldValue('stateName', item?.stateName || '');
        formik1.setFieldValue('shortName', item?.shortName || '');
        formik1.setFieldValue('id', item?.id || '');
        formik1.setFieldValue('status', "ACTIVE" || '');
        setUpdateVisible(true)
    }


    const createGetData = useSelector((state) => state.stateCreateGetData?.data?.data)
    // console.log('getData',createGetData)

    const data = useSelector((state) => state.StateGetData?.data?.data)
    // console.log('data', data)

    const filterState = data?.filter((state) => (
        state.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    ));

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

            <div className='stateContainer'>
                <div className='row state '>
                    <div className='col-6 col-lg-6 col-md-6 sm-6'>
                        <h5>State</h5>
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 sm-6 d-flex justify-content-end'>
                        <button className='newStateButton' onClick={newState}>
                            + New State
                        </button>
                    </div>
                </div>
                <div className='row mt-2 '>
                    <div className='col-12 d-flex justify-content-end'>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <InputText
                                type="search"
                                placeholder="Search by State ..."
                                style={{ height: '35px' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </IconField>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12  stateTable ">
                        {
                            stateGetLoading ? (
                                <div style={overlayStyle}>
                                    <div style={{ textAlign: "center" }}>
                                        <BeatLoader
                                            cssOverride={override}
                                            size={30}
                                            color={"#f8f9fa"}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <table className="table  mt-3" >
                                    <thead>
                                        <tr className='table-primary'>
                                            <th>S.No</th>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>Short Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterState?.length > 0 ? (
                                                filterState?.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1} </td>
                                                        <td>{item.countryName} </td>
                                                        <td>{item.stateName} </td>
                                                        <td>{item.shortName} </td>
                                                        <td className='stateGrpBtn'>
                                                            <button className='editIcon btn' onClick={() => editState(item)}><i className="fa-solid fa-pen-to-square" ></i></button>
                                                            <button className='deleteIcon btn' data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleDelete(item.id)}><i className="fa-regular fa-trash-can"></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='5' style={{ textAlign: 'center' }}>
                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                        <p>No Data Found</p>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            )
                        }

                    </div>

                </div>
            </div>
            {/*................................NewDIALOG...............................*/}

            <Dialog header="Create State" visible={visible} onHide={onCloseModal} className='stateDialog' style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80vw',
                maxWidth: '600px',
                height: 'auto',
                margin: '0 auto',
                maxHeight: '90vh'
            }}
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}>
                <form onSubmit={formik1.handleSubmit} autoComplete='off'>
                    <div className='form-group'>
                        <label className='mt-3'>Country <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="countryId"
                            id="countryId"
                            value={formik1.values.countryId}
                            style={{ fontSize: '12px' }}
                            className='form-select'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="" style={{ fontSize: '12px' }}>Select country</option>
                            {createGetData?.map((item) => (
                                <option key={item.id} value={item.id}> {item.name} </option>
                            ))}

                        </select>
                        {formik1.errors.countryId && formik1.touched.countryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>State <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='State Name'
                            name='stateName'
                            value={formik1.values.stateName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.stateName && formik1.touched.stateName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.stateName}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>Short Name <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='Short Name'
                            name='shortName'
                            value={formik1.values.shortName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.shortName && formik1.touched.shortName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.shortName}</p>
                        ) : null}
                    </div>
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(false)}>Create</button>
                        {/* {
                            stateCreateLoading && (
                                <div style={overlayStyle}>
                                    <div style={{ textAlign: "center" }}>
                                        <BeatLoader
                                            cssOverride={override}
                                            size={30}
                                            color={"#f8f9fa"}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                </div>
                            )
                        } */}
                    </div>
                </form>
            </Dialog>

            {/**.............................DELETE MODAL................................................ */}
            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header py-2">
                            <h6 className="modal-title">Delete State</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ fontSize: '10px', fontWeight: '500' }}></button>
                        </div>

                        <div className="modal-body py-2">
                            <p> Are you sure want to delete ? </p>
                        </div>


                        <div className="modal-footer py-2">

                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={closeDltModal}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={deleteState}>ok</button>
                        </div>

                    </div>
                </div>
            </div>

            {/*.....................................EDIT MODAL......................................................... */}
            <Dialog header="Update State" visible={updateVisible} onHide={updateOnCloseModal} className='stateDialog' style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80vw',
                maxWidth: '600px',
                height: 'auto',
                margin: '0 auto',
                maxHeight: '90vh'
            }}
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}>
                <form onSubmit={formik1.handleSubmit}>
                    <div className='form-group'>
                        <label className='mt-3'>Country <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="countryId"
                            id="countryId"
                            value={formik1.values.countryId}
                            // style={{ fontSize: '12px' }}
                            className='form-select'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="" style={{ fontSize: '12px' }}>Select country</option>
                            {createGetData?.map((item) => (
                                <option key={item.id} value={item.id}> {item.name} </option>
                            ))}

                        </select>
                        {formik1.errors.countryId && formik1.touched.countryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>State <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='State Name'
                            name='stateName'
                            value={formik1.values.stateName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.stateName && formik1.touched.stateName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.stateName}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>Short Name <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='Short Name'
                            name='shortName'
                            value={formik1.values.shortName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.shortName && formik1.touched.shortName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.shortName}</p>
                        ) : null}
                    </div>
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>Update</button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default State;
