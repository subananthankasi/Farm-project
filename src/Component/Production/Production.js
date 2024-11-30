import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import * as yup from "yup";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { productionGetThunk } from '../../Redux/Thunk/production/ProductionGetThunk';
import { productionPoultryGetThunk } from '../../Redux/Thunk/production/ProductionPoultryGetThunk';
import { productionBreedGetThunk } from '../../Redux/Thunk/production/ProductionBreedGetThunk';
import { productionCategoryThunk } from '../../Redux/Thunk/production/CategoryThunk';
import { productionCreateThunk } from '../../Redux/Thunk/production/ProductionCreateThunk';
import { productionDeleteThunk } from '../../Redux/Thunk/production/DeleteProductionThunk';
import 'react-toastify/dist/ReactToastify.css'
import './Production.css'
import { productionUpdateGetThunk } from '../../Redux/Thunk/production/UpdateGet';
import { productionUpdateBreedGetThunk } from '../../Redux/Thunk/production/UpdateBreedGet';
import BeatLoader from "react-spinners/BeatLoader";
import { productionUpdateThunk } from '../../Redux/Thunk/production/UpdateThunk';




const Production = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [UpdateVisible, setUpdateVisible] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState(null);
    const [selectedPoultryId, setSelectedPoultryId] = useState(null)
    const [productionBreedGetdata, setProductionBreedGetdata] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productionGetThunk())
        dispatch(productionPoultryGetThunk())
        dispatch(productionCategoryThunk())
    }, [dispatch])


    const productionData = useSelector((state) => state.productionGetData?.data?.data)
    const productionDataLoading = useSelector((state) => state.productionGetData.loading)


    const productionDeleteLoading = useSelector((state) => state.productionDelete.loading)


    const productionCreateLoading = useSelector((state) => state.productionCreate.loading)

    const productionUpdateLoading = useSelector((state) => state.productionUpdateGet.loading)
    // console.log('productionUpdateLoading', productionUpdateLoading)




    const productionPoultryGetData = useSelector((state) => state.productionPoultryGetData?.data?.data)
    const productionCategoryGetData = useSelector((state) => state.productionCategoryGetData?.data?.data)


    useEffect(() => {
        const fetchBreedData = async () => {
            try {
                if (selectedPoultryId) {
                    const resultAction = await dispatch(productionBreedGetThunk(selectedPoultryId));

                    if (productionBreedGetThunk.fulfilled.match(resultAction)) {
                        setProductionBreedGetdata(resultAction.payload.data);
                    } else {
                        console.error('Failed to fetch breed data:', resultAction.error.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching breed data:', error);
            }
        };

        if (selectedPoultryId) {
            fetchBreedData();
        }
    }, [selectedPoultryId, dispatch]);




    const productionFilter = productionData?.filter((production) => {
        const searchLower = search.toLowerCase();
        const formattedDate = new Date(production.date)?.toLocaleDateString('en-GB');
        const formattedExpiryDate = new Date(production.expiryDate)?.toLocaleDateString('en-GB');

        return (
            production.poultryName?.toLowerCase().includes(searchLower) ||
            production.breedName?.toLowerCase().includes(searchLower) ||
            production.categoryName?.toLowerCase().includes(searchLower) ||
            production.count?.toString().includes(search) ||
            formattedDate.includes(search) ||
            formattedExpiryDate.includes(search)
        );
    });

    const handlePoultryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedPoultryId(selectedId);
        formik1.handleChange(e);
    };

    const handlePoultryChangeEdit = (e) => {
        const poultryId = e.target.value;
        setSelectedPoultryId(poultryId);
        formik1.setFieldValue('poultryId', poultryId);

        if (poultryId) {
            dispatch(productionUpdateBreedGetThunk(poultryId))
                .then((resultAction) => {
                    if (productionUpdateBreedGetThunk.fulfilled.match(resultAction)) {
                        setProductionBreedGetdata(resultAction.payload.data);
                        formik1.setFieldValue('breedId', ''); // Reset the breed field
                    } else {
                        console.error('Failed to fetch breed data:', resultAction.error.message);
                    }
                });
        }
    };

    useEffect(() => {
        if (visible) {
            const today = new Date().toISOString().split('T')[0];
            formik1.setFieldValue('date', today);
        }
    }, [visible]);

    useEffect(() => {
        if (UpdateVisible) {
            const today = new Date().toISOString().split('T')[0];
            formik1.setFieldValue('date', today);
        }
    }, [visible]);
    const handleDeleteClick = (id) => {
        // console.log('handleDeleteClick', id)
        setSelectedId(id);
    };

    const handleDelete = async () => {
        try {
            if (selectedId) {

                await dispatch(productionDeleteThunk(selectedId));
                toast.success("Production deleted successfully.", {
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
                dispatch(productionGetThunk());
            }
        } catch (error) {
            toast.error('Error deleting production.');
        }
    };

    const closeDltModal = () => {
        setSelectedId(null);
    };
    const newProduction = () => {
        setVisible(true)
    }



    const productionUpdateGet = useSelector((state) => state.productionUpdateGet?.data?.data)
    // console.log('productionUpdateGet',productionUpdateGet)

    const productionUpdateBreedGet = useSelector((state) => state.productionUpdateBreedGet?.data?.data)
    const formatDate = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust for timezone offset
        return d.toISOString().split('T')[0];
    };
    const editProduction = async (production) => {
        try {

            await dispatch(productionUpdateGetThunk(production));


            if (production.poultryId) {
                const resultAction = await dispatch(productionUpdateBreedGetThunk(production.poultryId));


                if (productionUpdateBreedGetThunk.fulfilled.match(resultAction)) {

                    const breedData = resultAction.payload.data;
                    setProductionBreedGetdata(breedData);


                    if (breedData.length > 0) {
                        formik1.setFieldValue('breedId', production?.breedId || '');
                    } else {
                        console.error('Breed data is empty');
                    }
                } else {
                    console.error('Failed to fetch breed data:', resultAction.error.message);
                }
            }


            formik1.setFieldValue('poultryId', production?.poultryId || '');
            formik1.setFieldValue('categoryId', production?.categoryId || '');
            formik1.setFieldValue('count', production?.count || '');
            formik1.setFieldValue('price', production?.price || '');
            // formik1.setFieldValue('date', production?.date ? new Date(production?.date).toISOString().split('T')[0] : '');
            // formik1.setFieldValue('expiryDate', production?.expiryDate ? new Date(production?.expiryDate).toISOString().split('T')[0] : '');
            formik1.setFieldValue('date', production?.date ? formatDate(production.date) : '');
            formik1.setFieldValue('expiryDate', production?.expiryDate ? formatDate(production.expiryDate) : '');
            formik1.setFieldValue('id', production?.id || null);

            setUpdateVisible(true);
        } catch (error) {
            console.error('Error during editProduction:', error);
        }
    };




    const updateClosedDialog = () => {
        if (UpdateVisible) {
            setUpdateVisible(false);
            formik1.resetForm();
        }
    }
    const closeUpdateModel = () => {
        formik1.resetForm();
        setSelectedPoultryId('');
        if (UpdateVisible) {
            updateClosedDialog();
        }
    };

    const closedDialog = () => {
        if (visible) {
            setVisible(false);
            formik1.resetForm();
        }
    }

    const closeModel = () => {
        if (!isEditing) {
            formik1.resetForm();
            setSelectedPoultryId('');
            if (visible) {
                closedDialog();
            }
        }
    };

    const formatDateYearMonthDay = (value) => {
        if (!value) return '';

        const [year, month, day] = value.split('-');
        return [year, month, day].filter(Boolean).join('/');
    };


    const createValidationSchema = yup.object().shape({
        poultryId: yup.string().required("*required!!"),
        breedId: yup.string().required("*required!!"),
        categoryId: yup.string().required("*required!!"),
        count: yup.number().required("*required!!").positive("Must be a positive number"),
        price: yup.number().required("*required!!").positive("Must be a positive number"),
        date: yup.date().required("*required!!"),
        expiryDate: yup.date().required("*required!!"),
    });

    const editValidationSchema = yup.object().shape({
        poultryId: yup.string().required("*required!!"),
        breedId: yup.string().required("*required!!"),
        categoryId: yup.string().required("*required!!"),
        count: yup.number().required("*required!!").positive("Must be a positive number"),

        date: yup.date().required("*required!!"),
        expiryDate: yup.date().required("*required!!"),
    });

    const initialValuesCreate = {
        poultryId: '',
        breedId: '',
        categoryId: '',
        count: '',
        price: '',
        date: '',
        expiryDate: '',
        id: null
    };



    //..........................................................................................................................
    const formik1 = useFormik({
        initialValues: initialValuesCreate,
        validationSchema: isEditing ? editValidationSchema : createValidationSchema,
        onSubmit: async (values) => {

            // Edit Production
            if (isEditing) {
                console.log("Editing", values)
                const formattedExpiryDate = formatDateYearMonthDay(values.expiryDate);

                const payload = {
                    poultryId: values.poultryId,
                    breedId: values.breedId,
                    categoryId: values.categoryId,
                    count: values.count,
                    date: values.date,
                    expiryDate: formattedExpiryDate,
                    id: values.id
                }

                try {
                    const response = await dispatch(productionUpdateThunk(payload))
                    if (productionUpdateThunk.fulfilled.match(response)) {
                        const message = response.payload.data;
                        // console.log('message', message)

                        setUpdateVisible(false);
                        formik1.resetForm();
                        dispatch(productionGetThunk());

                        toast.success('ManageExpense updated successfully', {
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

                    } else if (productionUpdateThunk.rejected.match(response)) {
                        const errorPayload = response.payload.error.reason
                        console.log('dispatchjjj errorPayload :', errorPayload)

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
                    toast.error('Invalid Values', {
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
                // dispatch(productionUpdateThunk(payload)).then(()=>{
                //     dispatch(productionGetThunk());
                //     toast.success("Production  updated successfully.", {
                //         position: "top-right",
                //         autoClose: 2000,
                //         hideProgressBar: true,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: "colored",
                //         transition: Bounce,
                //     });
                // })
                // formik1.resetForm()
                // setUpdateVisible(false)

            } else {

                //....Create Production
                try {

                    const formattedExpiryDate = formatDateYearMonthDay(values.expiryDate);
                    const valuesToDispatch = {
                        ...values,
                        expiryDate: formattedExpiryDate
                    };

                    const resultAction = await dispatch(productionCreateThunk(valuesToDispatch));
                    console.log("resultAction", resultAction);

                    if (productionCreateThunk.fulfilled.match(resultAction)) {
                        const productionData = resultAction.payload;
                        console.log('productionData', productionData);

                        setVisible(false)

                        dispatch(productionGetThunk());

                        formik1.resetForm();
                        setSelectedPoultryId('');

                        // closeModel()
                        toast.success("Production created successfully.", {

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
                    } else if (productionCreateThunk.rejected.match(resultAction)) {
                        const productionDataError = resultAction.payload.reason
                        console.log('productionDataError', productionDataError)

                        toast.error(productionDataError, {
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
                        //    setVisible(true)
                    }
                } catch (error) {

                    toast.error("Production failed", {
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
        }

    })

    //.............................................................................................................................

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

            {
                productionDataLoading ? (
                    <>
                        <div style={overlayStyle}>
                            <div style={{ textAlign: "center" }}>
                                {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
                                <BeatLoader
                                    loading={productionDataLoading}
                                    cssOverride={override}
                                    size={30}
                                    color={"#f8f9fa"}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                        </div>


                    </>
                ) : (
                    <div className='productionContainer'>
                        <div className='row'>
                            <div className='col-6 col-lg-6 col-md-6 col-sm-6 '>
                                <h5 className='productionH5'>Production</h5>
                            </div>
                            <div className='col-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end'>
                                <button className='newProductionButton' onClick={newProduction}  >
                                    + New Production
                                </button>
                            </div>
                        </div>
                        <div className='row mt-2' >
                            <div className='col-12 d-flex justify-content-end'>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search" />
                                    <InputText
                                        type="search"
                                        placeholder="Search by Production ..."
                                        style={{ height: '30px', fontSize: '13px' }}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </IconField>
                            </div>
                        </div>
                        <div className='mt-3 productionTable'>
                            <table className="table  mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Poultry</th>
                                        <th>Breed</th>
                                        <th>Category</th>
                                        <th>Count</th>
                                        <th>Date </th>
                                        <th>Expiry Date </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productionFilter?.length > 0 ? (productionFilter?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1} </td>
                                                <td>{item.poultryName} </td>
                                                <td>{item.breedName} </td>
                                                <td>{item.categoryName}</td>
                                                <td>{item.count} </td>
                                                <td>{new Date(item.date).toLocaleDateString('en-GB')} </td>
                                                <td>{new Date(item.expiryDate).toLocaleDateString('en-GB')} </td>
                                                <td>
                                                    <button className='editIcon' onClick={() => editProduction(item)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className='deleteIcon' data-bs-toggle="modal" data-bs-target="#myModal" ><i className="fa-regular fa-trash-can" onClick={() => handleDeleteClick(item.id)} disabled={productionDeleteLoading}></i></button>
                                                    {productionDeleteLoading && (
                                                        <div style={overlayStyle}>
                                                            <div style={{ textAlign: "center" }}>
                                                                {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
                                                                <BeatLoader
                                                                    loading={productionDeleteLoading}
                                                                    cssOverride={override}
                                                                    size={30}
                                                                    color={"#f8f9fa"}
                                                                    aria-label="Loading Spinner"
                                                                    data-testid="loader"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan='8' style={{ textAlign: 'center' }}>
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
                )
            }
            {/*................................New DIALOG...............................*/}


            <Dialog
                header="Create Production"
                visible={visible}
                className='productionDialog'
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
                    maxHeight: '90vh',
                    overflowY: 'scroll'
                }}
                breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}
            >

                <form onSubmit={formik1.handleSubmit}>
                    <div className='form-group mt-2'>
                        <label>Poultry <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="poultryId"
                            id="Poultry"
                            value={formik1.values.poultryId}
                            className='form-select'
                            style={{ fontSize: '12px' }}
                            onChange={handlePoultryChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="">Select Poultry</option>
                            {
                                productionPoultryGetData?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.poultryName} </option>
                                ))
                            }

                        </select>
                        {formik1.errors.poultryId && formik1.touched.poultryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.poultryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label >Breed <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="breedId"
                            id="breed"
                            value={formik1.values.breedId}
                            style={{ fontSize: '12px' }}
                            className='form-select'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                            disabled={!selectedPoultryId}
                        >
                            <option value="">Select Breed</option>
                            {
                                productionBreedGetdata?.length > 0 ? (
                                    productionBreedGetdata.map((item, index) => (
                                        <option key={index} value={item.breedId}>{item.breedName}</option>
                                    ))
                                ) : (
                                    <option style={{ textAlign: 'center' }}>No data found</option>
                                )
                            }
                        </select>
                        {formik1.errors.breedId && formik1.touched.breedId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.breedId}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label>Category <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="categoryId"
                            id="category"
                            className='form-select'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.categoryId}
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="">Select Category</option>
                            {
                                productionCategoryGetData?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.category} </option>
                                ))
                            }
                        </select>
                        {formik1.errors.categoryId && formik1.touched.categoryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.categoryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label>Count <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='number'
                            placeholder='Count'
                            name='count'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.count}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.count && formik1.touched.count ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.count}</p>
                        ) : null}
                    </div>
                    {/* {!formik1.values.id && ( */}
                    <div className='form-group mt-2'>
                        <label>Price <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='number'
                            placeholder='Price'
                            name='price'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.price}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.price && formik1.touched.price ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.price}</p>
                        ) : null}
                    </div>
                    {/* )} */}

                    <div className='form-group mt-2'>
                        <label >Date <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='date'
                            name='date'
                            value={formik1.values.date}
                            style={{ fontSize: '12px' }}
                            className='form-control'
                            onChange={formik1.handleChange}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label >Expiry Date <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='date'
                            name='expiryDate'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.expiryDate}
                            className='form-control'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.expiryDate && formik1.touched.expiryDate ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.expiryDate}</p>
                        ) : null}
                    </div>
                    <div className='d-flex m-2' style={{ justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            className='btn btn-primary btn-sm'
                            onClick={() => setIsEditing(false)}
                        >
                            Create
                        </button>

                    </div>
                </form>


            </Dialog>


            {/*......................... DELETE MODAL..................................*/}
            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header py-2">
                            <h6 className="modal-title">Delete Poultry Chicken</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ fontSize: '10px', fontWeight: '500' }}></button>
                        </div>

                        <div className="modal-body py-2">
                            <p> Are you sure want to delete ? </p>
                        </div>


                        <div className="modal-footer py-2">

                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={closeDltModal}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={handleDelete} disabled={productionDeleteLoading}>ok</button>

                        </div>

                    </div>
                </div>
            </div>
            {/*.............................................EDIT MODAL............................................... */}
            {productionUpdateLoading ? (
                <div style={overlayStyle}>
                    <div style={{ textAlign: "center" }}>
                        {/* <p style={{ color: "#f8f9fa", marginBottom: "10px", fontSize: "25px" }}>Loading...</p> */}
                        <BeatLoader
                            loading={productionUpdateLoading}
                            cssOverride={override}
                            size={30}
                            color={"#f8f9fa"}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>) : (
                <Dialog
                    header="Production Update"
                    visible={UpdateVisible}
                    className='productionUpdateDialog'
                    onHide={closeUpdateModel}
                    style={{
                        position: 'absolute',
                        top: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80vw',
                        maxWidth: '600px',
                        height: 'auto',
                        margin: '0 auto',
                        maxHeight: '110vh',
                        overflowY: 'scroll'
                    }}
                    breakpoints={{ '960px': '75vw', '640px': '85vw', '425px': '95vw' }}
                >

                    <form onSubmit={formik1.handleSubmit}>
                        <div className='form-group mt-2'>
                            <label>Poultry <span style={{ color: 'red' }}>*</span> </label>
                            <select
                                name="poultryId"
                                id="Poultry1"
                                value={formik1.values.poultryId}
                                className='form-select'
                                style={{ fontSize: '12px' }}
                                onChange={handlePoultryChangeEdit}
                                onBlur={formik1.handleBlur}
                            >
                                <option value="">Select Poultry</option>
                                {
                                    productionPoultryGetData?.map((item, index) => (
                                        <option key={index} value={item.id}>{item.poultryName} </option>
                                    ))
                                }
                            </select>
                            {formik1.errors.poultryId && formik1.touched.poultryId ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.poultryId}</p>
                            ) : null}
                        </div>
                        <div className='form-group mt-2'>
                            <label >Breed <span style={{ color: 'red' }}>*</span> </label>
                            <select
                                name="breedId"
                                id="breed"
                                value={formik1.values.breedId}
                                style={{ fontSize: '12px' }}
                                className='form-select'
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            >
                                <option selected >Select Breed</option>

                                {
                                    productionBreedGetdata?.length > 0 ? (
                                        productionBreedGetdata.map((item, index) => (
                                            <option key={index} value={item.breedId}>{item.breedName}</option>
                                        ))
                                    ) : (
                                        <option style={{ textAlign: 'center' }}>No data found</option>
                                    )
                                }
                            </select>
                            {formik1.errors.breedId && formik1.touched.breedId ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.breedId}</p>
                            ) : null}
                        </div>
                        <div className='form-group mt-2'>
                            <label>Category <span style={{ color: 'red' }}>*</span> </label>
                            <select
                                name="categoryId"
                                id="category"
                                className='form-select'
                                style={{ fontSize: '12px' }}
                                value={formik1.values.categoryId}
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            >
                                <option value="">Select Category</option>
                                {
                                    productionCategoryGetData?.map((item, index) => (
                                        <option key={index} value={item.id}>{item.category} </option>
                                    ))
                                }
                            </select>
                            {formik1.errors.categoryId && formik1.touched.categoryId ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.categoryId}</p>
                            ) : null}
                        </div>
                        <div className='form-group mt-2'>
                            <label>Count <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type='number'
                                placeholder='Count'
                                name='count'
                                style={{ fontSize: '12px' }}
                                value={formik1.values.count}
                                className='form-control'
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            />
                            {formik1.errors.count && formik1.touched.count ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.count}</p>
                            ) : null}
                        </div>

                        <div className='form-group mt-2'>
                            <label >Date <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type='date'
                                name='date'
                                value={formik1.values.date}
                                style={{ fontSize: '12px' }}
                                className='form-control'
                                onChange={formik1.handleChange}
                            />
                        </div>
                        <div className='form-group mt-2'>
                            <label >Expiry Date <span style={{ color: 'red' }}>*</span> </label>
                            <input
                                type='date'
                                name='expiryDate'
                                style={{ fontSize: '12px' }}
                                value={formik1.values.expiryDate}
                                className='form-control'
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                            />
                            {formik1.errors.expiryDate && formik1.touched.expiryDate ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.expiryDate}</p>
                            ) : null}
                        </div>
                        <div className='d-flex m-2' style={{ justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                className='btn btn-primary btn-sm'
                                onClick={() => setIsEditing(true)}
                            >
                                update
                            </button>
                        </div>
                    </form>
                </Dialog>
            )}



        </>
    );
};

export default Production;
