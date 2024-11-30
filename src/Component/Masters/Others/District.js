import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import * as yup from "yup";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { toast, Bounce } from "react-toastify";
import './District.css'
import { useDispatch, useSelector } from 'react-redux';
import { districtGetThunk } from '../../../Redux/Thunk/OthersThunk/District/DistrictGetThunk';
import BeatLoader from "react-spinners/BeatLoader";
import { districtCountryGetThunk } from '../../../Redux/Thunk/OthersThunk/District/CreateGetCountry';
import { districtStateGetThunk } from '../../../Redux/Thunk/OthersThunk/District/DistrictStateGetThunk';
import { districtCreateThunk } from '../../../Redux/Thunk/OthersThunk/District/CreateDistrict';
import { districtDeleteThunk } from '../../../Redux/Thunk/OthersThunk/District/DeleteDistrict';
import { districtFetchThunk } from '../../../Redux/Thunk/OthersThunk/District/FetchDistrict';
import { districtFetchStateThunk } from '../../../Redux/Thunk/OthersThunk/District/FetchState';
import { districtUpdateThunk } from '../../../Redux/Thunk/OthersThunk/District/UpdateDistrict';

const District = () => {

    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCountryId, setSelectedCountryId] = useState(null)
    const [selectedStateData, setSelectedStateData] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const dispatch = useDispatch()



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


    const newDistrict = () => {
        setVisible(true)
    }


    const onSubmit = async (values, { resetForm }) => {
        if (isEditing) {
            const payload = {
                countryId: values.countryId,
                stateId: values.stateId,
                districtName: values.districtName,
                shortName: values.shortName,
                id: values.id
            }
            try {
                const response = await dispatch(districtUpdateThunk(payload))
                if (districtUpdateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    // console.log('message', message)

                    setUpdateVisible(false);
                    resetForm();
                    dispatch(districtGetThunk());

                    toast.success('District updated successfully', {
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

                } else if (districtUpdateThunk.rejected.match(response)) {
                    const errorPayload = response.payload.reason
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

        } else {
            //create
            try {
                const response = await dispatch(districtCreateThunk(values))
                if (districtCreateThunk.fulfilled.match(response)) {
                    const success = response.payload

                    // console.log('success',success)
                    setVisible(false);
                    setSelectedCountryId('');
                    resetForm();
                    await dispatch(districtGetThunk())
                    toast.success("District created successfully.", {
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
                else if (districtCreateThunk.rejected.match(response)) {
                    const errorMessage = response.payload.reason
                    // console.log('errorMessage', errorMessage)
                    toast.error(errorMessage, {
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
                console.log('An unexpected error:', error)
            }
            console.log('createDistrict values:', values);

        }

    }
    const formik1 = useFormik({
        initialValues: {
            countryId: '',
            stateId: '',
            districtName: '',
            shortName: '',
            id: null
        },
        validationSchema: yup.object().shape({
            countryId: yup.string().required("*required!!"),
            stateId: yup.string().required("*required!!"),
            districtName: yup.string().required("*required!!"),
            shortName: yup.string().required("*required!!"),
        }),
        onSubmit

    })

    const onCloseModal = () => {
        if (visible) {
            setVisible(false);
            setSelectedCountryId('');
            formik1.resetForm();
        }
    }
    const updateOnCloseModal = () => {
        if (updateVisible) {
            setUpdateVisible(false);
            setSelectedCountryId('');
            formik1.resetForm();
        }
    }
    const handleDelete = (id) => {
        setDeleteId(id)
        // console.log('id', id)
    }

    const deleteDistrict = async () => {

        try {

            const response = await dispatch(districtDeleteThunk(deleteId))
            if(districtDeleteThunk.fulfilled.match(response)){
                toast.success("District deleted successfully.", {
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
                dispatch(districtGetThunk());
    
            }
            else if(districtDeleteThunk.rejected.match(response)){
                const errorPayloadDlt = response.payload.reason
                // console.log('errorPayload',errorPayloadDlt)
                
                toast.error(errorPayloadDlt, {
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
            console.error("delete district error:", error);
        }
      
      
    }
    useEffect(() => {
        dispatch(districtGetThunk())
        dispatch(districtCountryGetThunk())
    }, [])


    const handleCountryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedCountryId(selectedId);
        formik1.handleChange(e);
    };

    const handleCountryChangeEdit = (e) => {
        const countryId = e.target.value;
        setSelectedCountryId(countryId);
        formik1.setFieldValue('countryId', countryId);

        if (countryId) {
            dispatch(districtFetchStateThunk(countryId))
                .then((response) => {
                    if (districtFetchStateThunk.fulfilled.match(response)) {
                        setSelectedStateData(response.payload.data);
                        formik1.setFieldValue('stateId', '')
                    }
                    else {
                        console.log('failed to fetch state data:', response.error.message)
                    }
                })
        }

    }


    const editDistrict = async (district) => {
        try {
            setUpdateVisible(true);


            await dispatch(districtFetchThunk(district));

            if (district.countryId) {

                const response = await dispatch(districtFetchStateThunk(district.countryId));
                // console.log('State Fetch Response:', response);

                if (districtFetchStateThunk.fulfilled.match(response)) {
                    const stateData = response.payload.data;
                    setSelectedStateData(stateData);
                    // console.log('State Data:', stateData);

                    if (stateData.length > 0) {

                        const foundState = stateData.find(item => item.id === district.stateId);
                        if (foundState) {
                            // console.log('Matched State:', foundState);
                            formik1.setFieldValue('stateId', district.stateId || '');
                        } else {
                            console.error('StateId not found in state data');
                        }
                    } else {
                        console.error('State data is empty');
                    }
                } else {
                    console.error('Failed to fetch state data:', response.error.message);
                }
            }


            formik1.setFieldValue('countryId', district?.countryId || '');
            formik1.setFieldValue('districtName', district?.districtName || '');
            formik1.setFieldValue('shortName', district?.shortName || '');
            formik1.setFieldValue('id', district?.id || null);
        } catch (error) {
            console.error('Error in editDistrict:', error);
        }
    };

    useEffect(() => {
        const fetchStateData = async () => {
            try {
                if (selectedCountryId) {
                    const response = await dispatch(districtStateGetThunk(selectedCountryId));
                    // console.log('Fetched State Data:', response);

                    if (districtStateGetThunk.fulfilled.match(response)) {
                        setSelectedStateData(response.payload.data);

                        if (response.payload.data.length > 0) {
                            const matchedState = response.payload.data.find(state => state.id === formik1.values.stateId);
                            if (matchedState) {
                                formik1.setFieldValue('stateId', formik1.values.stateId);
                            } else {
                                console.log('StateId not found in fetched data.');
                            }
                        }
                    } else {
                        console.error('Failed to fetch state data:', response.error.message);
                    }
                }
            } catch (error) {
                console.log('stateGetError:', error);
            }
        };

        if (selectedCountryId) {
            fetchStateData();
        }
    }, [selectedCountryId, dispatch]);




    const districtGetData = useSelector((state) => state.districtGetData?.data?.data)
    const districtCountryGet = useSelector((state) => state.districtGetCountryData?.data?.data)
    const districtStateGet = useSelector((state) => state.districtStateGetData?.data?.data)
    // console.log('districtStateGet', districtStateGet)
    const districtGetLoading = useSelector((state) => state.districtGetData.loading)
    const districtFetchLoading = useSelector((state) => state.fetchDistrict.loading)



    const filterDistrict = districtGetData?.filter((district) => (
        district.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        district.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        district.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        district.shortName.toLowerCase().includes(searchTerm.toLowerCase())
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

            {districtGetLoading ? (
                <div style={overlayStyle}>
                    <div style={{ textAlign: "center" }}>
                        <BeatLoader
                            loading={districtGetLoading}
                            cssOverride={override}
                            size={30}
                            color={"#f8f9fa"}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (
                <div className='districtContainer'>

                    <div className='row district '>
                        <div className='col-6 col-lg-6 col-md-6 sm-6'>
                            <h5>District</h5>
                        </div>
                        <div className='col-6 col-lg-6 col-md-6 sm-6 d-flex justify-content-end'>
                            <button className='newStateButton' onClick={newDistrict}>
                                + New District
                            </button>
                        </div>
                    </div>
                    <div className='row mt-2 '>
                        <div className='col-12 d-flex justify-content-end'>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-search" />
                                <InputText
                                    type="search"
                                    placeholder="Search by District ..."
                                    style={{ height: '35px' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </IconField>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12  districtTable ">
                            <table className="table  mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>District</th>
                                        <th>Short Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterDistrict?.length > 0 ? (
                                            filterDistrict?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.countryName}</td>
                                                    <td>{item.stateName}</td>
                                                    <td>{item.districtName}</td>
                                                    <td>{item.shortName}</td>
                                                    <td className="districtBtnGrb">
                                                        <button className="editIcon btn" onClick={() => editDistrict(item)}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            className="deleteIcon btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#myModal"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan='6' style={{ textAlign: 'center' }}>
                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                    <p>No Data Found</p>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}


            {/*................................NEW DIALOG...............................*/}

            <Dialog
                header="Create District"
                visible={visible}
                onHide={onCloseModal}
                className='districtDialog'
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
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}>
                <form onSubmit={formik1.handleSubmit} autoComplete='off'>
                    <div className='form-group'>
                        <label className='mt-3'>Country <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="countryId"
                            id="countryId"
                            style={{ fontSize: '12px' }}
                            value={formik1.values.countryId}
                            className='form-select'
                            onChange={handleCountryChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="">Select Country</option>
                            {
                                districtCountryGet?.map((item) => (
                                    <option key={item.id} value={item.id}> {item.name} </option>
                                ))
                            }

                        </select>
                        {formik1.errors.countryId && formik1.touched.countryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>State <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="stateId"
                            id="stateId"
                            style={{ fontSize: '12px' }}
                            className='form-select'
                            value={formik1.values.stateId}
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                            disabled={!selectedCountryId}

                        >
                            <option selected >Select State</option>
                            {
                                districtStateGet?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.stateName}</option>
                                ))
                            }
                        </select>
                        {formik1.errors.stateId && formik1.touched.stateId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.stateId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>District <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='district'
                            name='districtName'
                            value={formik1.values.districtName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.districtName && formik1.touched.districtName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.districtName}</p>
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
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(false)}>Create</button>
                    </div>
                </form>
            </Dialog>


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
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={deleteDistrict} >ok</button>
                        </div>

                    </div>
                </div>
            </div>

            {/*.............................EDIT MODAL.............................................. */}
          {
            districtFetchLoading ? (
                <div style={overlayStyle}>
                <div style={{ textAlign: "center" }}>
                    <BeatLoader
                        loading={districtGetLoading}
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
                header="Update District"
                visible={updateVisible}
                onHide={updateOnCloseModal}
                className='districtDialog'
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
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}>
                <form onSubmit={formik1.handleSubmit} autoComplete='off'>
                    <div className='form-group'>
                        <label className='mt-3'>Country <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="countryId"
                            id="countryId"
                            style={{ fontSize: '12px' }}
                            value={formik1.values.countryId}
                            className='form-select'
                            onChange={handleCountryChangeEdit}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="">Select Country</option>
                            {
                                districtCountryGet?.map((item) => (
                                    <option key={item.id} value={item.id}> {item.name} </option>
                                ))
                            }

                        </select>
                        {formik1.errors.countryId && formik1.touched.countryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.countryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>State <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="stateId"
                            id="stateId"
                            style={{ fontSize: '12px' }}
                            value={formik1.values.stateId}
                            className='form-select'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option selected >Select State</option>
                            {selectedStateData?.map((item) => (
                                <option key={item.id} value={item.id}>{item.stateName}</option>
                            ))}
                        </select>
                        {formik1.errors.stateId && formik1.touched.stateId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.stateId}</p>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <label className='mt-3'>District <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='district'
                            name='districtName'
                            value={formik1.values.districtName}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.districtName && formik1.touched.districtName ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.districtName}</p>
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
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>Update</button>
                    </div>
                </form>
            </Dialog>
            )
          }
            

        </>
    );
};

export default District;
