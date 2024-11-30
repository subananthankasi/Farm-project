import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { countryGetThunk } from '../../../Redux/Thunk/OthersThunk/Country/CountryThunk';
import { toast, Bounce } from "react-toastify";
import { countryCreateThunk } from '../../../Redux/Thunk/OthersThunk/Country/CountryCreateThunk';
import { countryDeleteThunk } from '../../../Redux/Thunk/OthersThunk/Country/CountryDltThunk';
import { countryFetchThunk } from '../../../Redux/Thunk/OthersThunk/Country/FetchCountryThunk';
import { countryUpdateThunk } from '../../../Redux/Thunk/OthersThunk/Country/UpdateCountryThunk';
import BeatLoader from "react-spinners/BeatLoader";
import './Country.css';
import * as yup from "yup";


const Country = () => {

    const [visible, setVisible] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [countryDltId, setCountryDltId] = useState(null)
    const [isEditing, setIsEditing] = useState(false)





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


    const newCountry = () => {
        setVisible(true)
    }
    const updateLoading = useSelector((state) => state.countryUpdate.loading)
    // console.log('loading', updateLoading)

    const handlesubmitValues = async (values) => {

        if (isEditing) {
            //EDITING
            const payload = {
                name: values.name,
                shortName: values.shortName,
                countryCode: values.countryCode,
                id: values.id,
                status: "ACTIVE"
            }
            try {
                const response = await dispatch(countryUpdateThunk(payload))
                if (countryUpdateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    // console.log('message', message)

                    setUpdateVisible(false);
                    formik1.resetForm();
                    dispatch(countryGetThunk());

                    toast.success('Country updated successfully', {
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

                } else if (countryUpdateThunk.rejected.match(response)) {
                    const errorPayload = response.payload.reason.response.data.error.reason
                    // console.log('dispatch errorPayload :', errorPayload)

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


        }
        else {
            //CREATING

            try {
                const resultAction = await dispatch(countryCreateThunk(values));
                // console.log("resultAction", resultAction);

                if (countryCreateThunk.fulfilled.match(resultAction)) {
                    const message = resultAction.payload.data;
                    // console.log('message', message)

                    setVisible(false);
                    formik1.resetForm();
                    dispatch(countryGetThunk())

                    toast.success('Country created successfully', {
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

                } else if (countryCreateThunk.rejected.match(resultAction)) {
                    const errorPayload = resultAction.payload.reason;
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
            } catch (error) {
                console.log('error', error)
            }
        }


    };
    const createLoadingResponse = useSelector((state) => state.countryCreate.loading)





    const formik1 = useFormik({
        initialValues: {
            name: '',
            shortName: '',
            countryCode: '',
            id: null,
            status: "ACTIVE"
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("*required!!"),
            shortName: yup.string().required("*required!!"),
            countryCode: yup.string().required("*required!!"),
        }),
        onSubmit: handlesubmitValues
    })


    useEffect(() => {
        dispatch(countryGetThunk())
    }, [])

    const deleteClick = (id) => {
        // console.log('id', id)
        setCountryDltId(id)
    }

    const deleteCountry = async () => {
        try {

            const response = await dispatch(countryDeleteThunk(countryDltId))
            if (countryDeleteThunk.fulfilled.match(response)) {
                const success = response.payload.data
                console.log('success', success)
                toast.success("Country deleted successfully.", {
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
                dispatch(countryGetThunk());

            }
            else if (countryDeleteThunk.rejected.match(response)) {
                const errorPayload = response.payload.error.reason
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
            console.error("Delete country error:", error);
        }
    };

    const updateCountryData = useSelector((state) => state.countryFetchData?.data?.data)
    // console.log('updateCountryData',updateCountryData);

    const editCountry = (data) => {
        // console.log('editId', data)
        dispatch(countryFetchThunk(data))

        formik1.setFieldValue('name', data?.name || '');
        formik1.setFieldValue('shortName', data?.shortName || '');
        formik1.setFieldValue('countryCode', data?.countryCode || '');
        formik1.setFieldValue('id', data?.id || '');
        formik1.setFieldValue('status', data?.status || '');
        setUpdateVisible(true)
    }


    const countryData = useSelector((state) => state.countryGetData?.data?.data)
    // console.log('countryData', countryData)
    const fetchLoading = useSelector((state) => state.countryFetchData.loading)



    const filteredCountries = countryData?.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const countryGetLoading = useSelector((state) => state.countryGetData.loading)
    // console.log('countryGetLoading', countryGetLoading)

    const closeModel = () => {
        if (visible) {
            setVisible(false);
            formik1.resetForm();
        }
    };
    const updateCloseModel = () => {
        if (updateVisible) {
            setUpdateVisible(false);
            formik1.resetForm();
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



            <div className='countryContainer'>

                <div className='row country '>
                    <div className='col-6 col-lg-6 col-md-6 sm-6'>
                        <h5 className='countryH5'>Country</h5>
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 sm-6 d-flex justify-content-end'>
                        <button className='newCountryButton' onClick={newCountry}>
                            + New Country
                        </button>
                    </div>
                </div>
                <div className='row mt-2 '>
                    <div className='col-12 d-flex justify-content-end'>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <InputText
                                type="search"
                                placeholder="Search by Country ..."
                                style={{ height: '35px' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </IconField>
                    </div>
                </div>
                <div className='mt-3 countryTable '>

                    {countryGetLoading ? (
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
                        <table className="table">
                            <thead>
                                <tr className='table-primary'>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Short Name</th>
                                    <th>Phone Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCountries?.length > 0 ? (
                                    filteredCountries.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.shortName.toUpperCase()}</td>
                                            <td>{data.countryCode}</td>
                                            <td className='grpBtn'>
                                                <button className='editIcon btn' onClick={() => editCountry(data)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button className='deleteIcon btn' type='button' data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => deleteClick(data.id)}>
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                            <p>No Data Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>

            {/*......................................CREATE MODAL...............................................................*/}

            <Dialog
                header="Create Country"
                visible={visible}
                className='Dialog'
                onHide={closeModel}
                style={{
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
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}
            >
                <form onSubmit={formik1.handleSubmit} autoComplete='off'>
                    <div>
                        <label className='mt-3'>Name <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={formik1.values.name}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.name && formik1.touched.name ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.name}</p>
                        ) : null}
                    </div>
                    <div>
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
                    <div>
                        <label className='mt-3'>Phone Code <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='Phone Code'
                            name='countryCode'
                            value={formik1.values.countryCode}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.countryCode && formik1.touched.countryCode ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryCode}</p>
                        ) : null}
                    </div>
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(false)}>Create</button>
                        {/* {
                            createLoadingResponse && (
                                <div style={overlayStyle}>
                                    <div style={{ textAlign: "center" }}>
                                        <BeatLoader
                                            // loading={updateLoading}
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




            {/*...................................EDIT MODAL........................................................... */}

            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h6 className="modal-title">Delete Country</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ fontSize: '10px', fontWeight: '500' }}></button>
                        </div>
                        <div className="modal-body py-2">
                            <p> Are you sure want to delete ? </p>
                        </div>
                        <div className="modal-footer py-2">
                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={closeDltModal}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={deleteCountry}>ok</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*...................................EDIT MODAL........................................ */}
            {fetchLoading ? (
                <div style={overlayStyle}>
                    <div style={{ textAlign: "center" }}>
                        {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
                        <BeatLoader
                            loading={fetchLoading}
                            cssOverride={override}
                            size={30}
                            color={"#f8f9fa"}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (
                <Dialog
                    header="Update Country"
                    visible={updateVisible}
                    className='Dialog'
                    onHide={updateCloseModel}
                    style={{
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
                    breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}
                >
                    <form onSubmit={formik1.handleSubmit} autoComplete='off'>
                        <div>
                            <label className='mt-3'>Name <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={formik1.values.name}
                                className='form-control'
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            />
                            {formik1.errors.name && formik1.touched.name ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.name}</p>
                            ) : null}
                        </div>
                        <div>
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
                        <div>
                            <label className='mt-3'>Phone Code <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type='text'
                                placeholder='Phone Code'
                                name='countryCode'
                                value={formik1.values.countryCode}
                                className='form-control'
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            />
                            {formik1.errors.countryCode && formik1.touched.countryCode ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryCode}</p>
                            ) : null}
                        </div>
                        <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                            <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>Update</button>

                        </div>
                    </form>
                </Dialog>

            )}
        </>
    );
};

export default Country;
