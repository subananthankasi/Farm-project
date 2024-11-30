import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import * as yup from "yup";
import { toast, Bounce } from "react-toastify";
import './ManageExpense.css'
import { useDispatch, useSelector } from 'react-redux';
import { manageGetThunk } from '../../Redux/Thunk/Managae Expense/ManageGet';
import { managePoultryGetThunk } from '../../Redux/Thunk/Managae Expense/ManagePoultryGet';
import { manageExpenseGEtThunk } from '../../Redux/Thunk/Managae Expense/ManageExpenseGet';
import { manageCreateThunk } from '../../Redux/Thunk/Managae Expense/Create';
import { manageDeleteThunk } from '../../Redux/Thunk/Managae Expense/Delete';
import { manageFetchThunk } from '../../Redux/Thunk/Managae Expense/Fetch';
import { manageUpdateThunk } from '../../Redux/Thunk/Managae Expense/Update';
import BeatLoader from "react-spinners/BeatLoader";
import { manageSearchThunk } from '../../Redux/Thunk/Managae Expense/SearchManage';
import { manageXlThunk } from '../../Redux/Thunk/Managae Expense/XLdownload';
import { manageWordThunk } from '../../Redux/Thunk/Managae Expense/WordDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import Select from 'react-select';


const ManageExpense = () => {

    const [visible, setVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfVisible, setPdfVisible] = useState(false)
    const [searchDataClear, setSearchDataClear] = useState('')
    const dispatch = useDispatch()


    const { loading, data } = useSelector((state) => state.manageWord);

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
    const newManageExpense = () => {
        setVisible(true)
    }

    const formatDate = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust for timezone offset
        return d.toISOString().split('T')[0];
    };
    const editManageExpense = (manage) => {
        dispatch(manageFetchThunk(manage))
        console.log('manage', manage)
        // console.log(manage.amount)
        const sanitizedAmount = manage?.amount ? manage.amount.replace(/,/g, '') : '';

        formik1.setFieldValue('poultryId', manage?.poultryId)
        formik1.setFieldValue('expenseHeadId', manage?.expenseHeadId)
        formik1.setFieldValue('description', manage?.description)
        formik1.setFieldValue('amount', sanitizedAmount && !isNaN(Number(sanitizedAmount)) ? Number(sanitizedAmount) : '');
        formik1.setFieldValue('id', manage?.id)
        // formik1.setFieldValue('date', manage?.date ? new Date(manage?.date).toISOString().split('T')[0] : '');
        formik1.setFieldValue('date', manage?.date ? formatDate(manage.date) : '');
        setUpdateVisible(true)
    }

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

    const handleDelete = (id) => {
        setDeleteId(id)
        //  console.log('id',id)
    }

    const manageExpenseDelete = async () => {


        try {

            dispatch(manageDeleteThunk(deleteId)).then(() => {
                dispatch(manageGetThunk())
                toast.success("ManageExpense deleted successfully.", {
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
            })


        }
        catch (error) {
            console.log(error)
        }
    }

    const formatDateYearMonthDay = (value) => {
        if (!value) return '';

        const [year, month, day] = value.split('-');
        return [year, month, day].filter(Boolean).join('/');
    };


    const manageHandelSubmit = async (values, { resetForm }) => {
        if (isEditing) {
            // Editing
            // console.log('EditingValues:', values)
            const dateChangeFormat = formatDateYearMonthDay(values.date)
            const payload = {
                poultryId: values.poultryId,
                expenseHeadId: values.expenseHeadId,
                description: values.description,
                date: dateChangeFormat,
                amount: values.amount,
                id: values.id
            }
            try {
                const response = await dispatch(manageUpdateThunk(payload))
                if (manageUpdateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    // console.log('message', message)

                    setUpdateVisible(false);
                    formik1.resetForm();
                    dispatch(manageGetThunk());

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

                } else if (manageUpdateThunk.rejected.match(response)) {
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
            // dispatch(manageUpdateThunk(payload)).then(
            //     dispatch(manageGetThunk())
            // )
            // setUpdateVisible(false)
            // formik1.resetForm()

            // toast.success("ManageExpense updated successfully.", {
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


        }
        else {
            //Create
            try {
                const formatDate = formatDateYearMonthDay(values.date);
                const valuesToDispatch = {
                    ...values,
                    date: formatDate
                };
                const response = await dispatch(manageCreateThunk(valuesToDispatch))
                if (manageCreateThunk.fulfilled.match(response)) {
                    const success = response.payload.data
                    // console.log('success',success)
                    resetForm()
                    setVisible(false)
                    toast.success("ManageExpense created successfully.", {
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
                    dispatch(manageGetThunk())
                }
                else if (manageCreateThunk.rejected.match(response)) {
                    const errorMsg = response.payload.reason
                    // console.log('errorMsg',errorMsg)
                    toast.error(errorMsg, {
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
    };


    const formik1 = useFormik({
        initialValues: {
            poultryId: '',
            expenseHeadId: '',
            description: '',
            date: '',
            amount: '',
            id: null

        },
        validationSchema: yup.object().shape({
            poultryId: yup.string().required("*required!!"),
            expenseHeadId: yup.string().required("*required!!"),
            description: yup.string().required("*required!!"),
            date: yup.date().required("*required!!"),
            amount: yup.number()
                .typeError("Amount must be a number")
                .required("*required!!"),
        }),
        onSubmit: manageHandelSubmit

    })

    useEffect(() => {
        dispatch(manageGetThunk())
        dispatch(managePoultryGetThunk())
        dispatch(manageExpenseGEtThunk())
    }, [])

    const manageData = useSelector((state) => state.manageData?.data?.data)
    const poultryData = useSelector((state) => state.managePoultryGet?.data?.data)
    const expenseData = useSelector((state) => state.manageExpenseGet?.data?.data)

    const manageGetLoading = useSelector((state) => state.manageData?.loading)
    // const manageWord = useSelector((state) => state.manageWord?.data)
    // console.log('manageWord', manageWord)

    const manageFetchLoading = useSelector((state) => state.manageFetch?.loading)


    const manageWord = useSelector((state) => state.manageWord?.data);
    const poultryOptions = poultryData?.map((item) => ({
        value: item.poultryName,
        label: item.poultryName,
    }));


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
    const searchData = useSelector((state) => state.manageSearch?.data?.data)
    // console.log('searchData', searchData)

    const formik = useFormik({
        initialValues: {
            poultryName: '',
            startDate: '',
            endDate: '',
        },
        validationSchema: yup.object().shape({
            startDate: yup.date().required('required!!'),
            endDate: yup.date().required('required!!')
        }),
        onSubmit: (values) => {
            dispatch(manageSearchThunk(values))
            setIsSearchTriggered(true);
        }
    })
    const handleButtonClick = (action) => {

        const formValues = formik.values;

        switch (action) {
            case 'filter':
                formik.handleSubmit();
                break;
            case 'reset':
                handleReset(formValues);
                break;
            case 'download':
                handleDownload(formValues);
                break;
            case 'excel':
                handleExcelExport(formValues);
                break;
            default:
                break;
        }
    };

    const handleReset = (values) => {
        formik.resetForm()
        setIsSearchTriggered(false)
        formik.setFieldValue('poultryName', null); 
        setPdfUrl('')
        // setSearchDataClear(null)
    }




    // const handleDownload = (values) => {
    //     dispatch(manageWordThunk(values)).then((action) => {
    //         if (action.payload && action.meta.requestStatus === 'fulfilled') {

    //             const blob = new Blob([action.payload], { type: 'application/pdf' });
    //             const downloadUrl = window.URL.createObjectURL(blob);


    //             const link = document.createElement('a');
    //             link.href = downloadUrl;
    //             link.setAttribute('download', 'Expense.pdf');

    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();
    //         }
    //     });
    // };


    // const downloadPdf =  () => {
    //     console.log("pdf")
    // }

    const handleDownload = (values) => {
        setPdfVisible(true);
        dispatch(manageWordThunk(values)).then((action) => {
            if (action.payload && action.meta.requestStatus === 'fulfilled') {
                const blob = new Blob([action.payload], { type: 'application/pdf' });
                const downloadUrl = window.URL.createObjectURL(blob);

                // Set the PDF URL for preview and open the modal
                setPdfUrl(downloadUrl);
                setPdfVisible(true);
            }
        });
    };
    const downloadPdf = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', 'Expense.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

   




 


    const handleExcelExport = (values) => {
        dispatch(manageXlThunk(values)).then((action) => {
            if (action.payload && action.meta.requestStatus === 'fulfilled') {
                const blob = new Blob([action.payload], { type: 'application/vnd.ms-excel' });
                const downloadUrl = window.URL.createObjectURL(blob);

                //this is temporary link
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'expense.xlsx');

                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        });
    };


    const wordData = useSelector((state) => state.manageWord?.data)
    // console.log('wordData', wordData)


    return (
        <>


            <div className='manageReadContainer'>
                <div className='row'>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6'>
                        <h5 className='manageH5'>Manage Expense</h5>
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end'>
                        <button className='newManageExpenseButtons' onClick={newManageExpense}  >
                            + New Manage Expense
                        </button>
                    </div>

                </div>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <form onSubmit={formik.handleSubmit}>

                            <div className='row'>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <label htmlFor="Poultry" className='manageRowLabel'>Poultry </label>
                                    {/* <input type="text" className='form-control mt-2' placeholder='Search Poultry...' style={{ fontSize: '12px' }} /> */}
                                    {/* <select
                                        name="poultryName"
                                        id="poultryName"
                                        style={{ fontSize: '12px' }}
                                        value={formik.values.poultryName}
                                        className='form-control mt-2'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option > Search Poultry...</option>
                                        {
                                            poultryData?.map((item) => (
                                                <option key={item.id} value={item.poultryName}>{item.poultryName} </option>
                                            ))
                                        }
                                    </select> */}
                                    <Select
                                        name="poultryName"
                                        id="poultryName"
                                        className=" mt-2"

                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                fontSize: '12px',
                                                minHeight: '28px',
                                                padding: '0px',
                                            }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                padding: '0px 8px',
                                            }),
                                            indicatorsContainer: (base) => ({
                                                ...base,
                                                height: '28px',
                                                display: 'none'
                                            }),
                                        }}
                                        options={poultryOptions}
                                        value={formik.values.poultryName ? poultryOptions.find(option => option.value === formik.values.poultryName) : null} 
                                        // value={poultryOptions?.find(option => option.value === formik.values.poultryName)}
                                        onChange={(selectedOption) => formik.setFieldValue('poultryName', selectedOption?.value)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Search Poultry..."
                                        isSearchable
                                    />
                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <label htmlFor="" className='manageRowLabel'> Start Date <span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        type="date"
                                        name='startDate'
                                        className='form-control mt-2'
                                        style={{ fontSize: '12px' }}
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.startDate && formik.touched.startDate ? (
                                        <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.startDate}</p>
                                    ) : null}
                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <label htmlFor="" className='manageRowLabel'> End Date <span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        type="date"
                                        name='endDate'
                                        className='form-control mt-2'
                                        style={{ fontSize: '12px' }}
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.endDate && formik.touched.endDate ? (
                                        <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.endDate}</p>
                                    ) : null}
                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12 d-flex justify-content-around' style={{ marginTop: '30px' }} >
                                    <button className=' filterManageButtons' type='submit' onClick={() => handleButtonClick('filter')}> <FilterListIcon /></button>
                                    <button className=' resetManageButtons' type='button' onClick={() => handleButtonClick('reset')}> <RestartAltIcon /></button>
                                    <button className=' downloadManageButtons' type='button' onClick={() => handleButtonClick('download')}>  <DownloadIcon /></button>
                                    <button className=' xlManageButtons' type='button' onClick={() => handleButtonClick('excel')}> <i class="fa fa-file-excel-o"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='manageTable'>
                    {manageGetLoading ? (
                        <div style={overlayStyle}>
                            <div style={{ textAlign: "center" }}>
                                <BeatLoader
                                    loading={manageGetLoading}
                                    cssOverride={override}
                                    size={30}
                                    color={"#f8f9fa"}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                        </div>
                    ) : isSearchTriggered && searchData && searchData.length > 0 ? (
                        <table className="table mt-3">
                            <thead>
                                <tr className='table-primary'>
                                    <th>S.No</th>
                                    <th>Poultry</th>
                                    <th>Expense Type</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.poultryName}</td>
                                        <td>{item.expenseType}</td>
                                        <td>{item.date}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <button className="editManageIcon" onClick={() => editManageExpense(item)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className="deleteManageIcon" data-bs-toggle="modal" data-bs-target="#myModal">
                                                <i className="fa-regular fa-trash-can" onClick={() => handleDelete(item.id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : !isSearchTriggered && manageData && manageData.length > 0 ? (
                        <table className="table mt-3">
                            <thead>
                                <tr className='table-primary'>
                                    <th>S.No</th>
                                    <th>Poultry</th>
                                    <th>Expense type</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manageData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.poultryName}</td>
                                        <td>{item.expenseType}</td>
                                        <td>{item.date}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <button className="editManageIcon" onClick={() => editManageExpense(item)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className="deleteManageIcon" data-bs-toggle="modal" data-bs-target="#myModal">
                                                <i className="fa-regular fa-trash-can" onClick={() => handleDelete(item.id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="table mt-3">
                            <thead>
                                <tr className='table-primary'>
                                    <th>S.No</th>
                                    <th>POULTRY</th>
                                    <th>EXPENSE TYPE</th>
                                    <th>DATE</th>
                                    <th>AMOUNT</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <p>No Data Found</p>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    )}
                </div>
            </div>
            {/*................................NEW DIALOG...............................*/}

            <Dialog
                header="Create Manage Expence"
                visible={visible}
                className='.manageDialog {'
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
                <form onSubmit={formik1.handleSubmit} >
                    <div className='form-group'>
                        <label>Poultry <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="poultryId"
                            id="poultryId"
                            style={{ fontSize: '12px' }}
                            value={formik1.values.poultryId}
                            className='form-select mt-2'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option >Select Poultry</option>
                            {
                                poultryData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.poultryName} </option>
                                ))
                            }
                        </select>
                        {formik1.errors.poultryId && formik1.touched.poultryId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.poultryId}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label>Expense Type <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="expenseHeadId"
                            id="expenseHeadId"
                            style={{ fontSize: '12px' }}
                            value={formik1.values.expenseHeadId}
                            className='form-select mt-2'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        >
                            <option value="">Select Type</option>
                            {
                                expenseData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.expenseType} </option>
                                ))
                            }

                        </select>
                        {formik1.errors.expenseHeadId && formik1.touched.expenseHeadId ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.expenseHeadId}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label >Description <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='text'
                            placeholder='Description'
                            name='description'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.description}
                            className='form-control mt-2'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.description && formik1.touched.description ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.description}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label>Date <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='date'
                            name='date'
                            style={{ fontSize: '12px' }}
                            value={formik1.values.date}
                            className='form-control mt-2'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.date && formik1.touched.date ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.date}</p>
                        ) : null}
                    </div>
                    <div className='form-group mt-2'>
                        <label >Amount <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type='number'
                            placeholder='Amount'
                            name='amount'
                            value={formik1.values.amount}
                            className='form-control mt-2'
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.amount && formik1.touched.amount ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.amount}</p>
                        ) : null}
                    </div>
                    <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                        <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(false)}>Create</button>
                    </div>
                </form>
            </Dialog>

            {/*.....................................DELETE MODAL................................................*/}
            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header py-2">
                            <h6 className="modal-title">Delete Manage Expense</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ fontSize: '10px', fontWeight: '500' }}></button>
                        </div>

                        <div className="modal-body py-2">
                            <p> Are you sure want to delete ? </p>
                        </div>


                        <div className="modal-footer py-2">

                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={closeDltModal}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={manageExpenseDelete}>ok</button>
                        </div>

                    </div>
                </div>
            </div>
            {/*.................................EDIT MODAL.............................................*/}

            {
                manageFetchLoading ? (
                    <div style={overlayStyle}>
                        <div style={{ textAlign: "center" }}>
                            <BeatLoader
                                loading={manageFetchLoading}
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
                        header="Manage Expense Update"
                        visible={updateVisible}
                        className='.manageDialog {'
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
                        <form onSubmit={formik1.handleSubmit} >
                            <div className='form-group mt-2'>
                                <label>Poultry <span style={{ color: 'red' }}>*</span> </label>
                                <select
                                    name="poultryId"
                                    id="poultryId"
                                    style={{ fontSize: '12px' }}
                                    value={formik1.values.poultryId}
                                    className='form-select mt-2'
                                    onChange={formik1.handleChange}
                                    onBlur={formik1.handleBlur}
                                >
                                    <option >Select Poultry</option>
                                    {
                                        poultryData?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.poultryName} </option>
                                        ))
                                    }
                                </select>
                                {formik1.errors.poultryId && formik1.touched.poultryId ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.poultryId}</p>
                                ) : null}
                            </div>
                            <div className='form-group mt-2'>
                                <label>Expense Type <span style={{ color: 'red' }}>*</span> </label>
                                <select
                                    name="expenseHeadId"
                                    id="expenseHeadId"
                                    style={{ fontSize: '12px' }}
                                    value={formik1.values.expenseHeadId}
                                    className='form-select mt-2'
                                    onChange={formik1.handleChange}
                                    onBlur={formik1.handleBlur}
                                >
                                    <option value="">Select Type</option>
                                    {
                                        expenseData?.map((item) => (
                                            <option key={item.id} value={item.id} >{item.expenseType} </option>
                                        ))
                                    }

                                </select>
                                {formik1.errors.expenseHeadId && formik1.touched.expenseHeadId ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.expenseHeadId}</p>
                                ) : null}
                            </div>
                            <div className='form-group mt-2'>
                                <label >Description <span style={{ color: 'red' }}>*</span> </label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    name='description'
                                    style={{ fontSize: '12px' }}
                                    value={formik1.values.description}
                                    className='form-control mt-2'
                                    onChange={formik1.handleChange}
                                    onBlur={formik1.handleBlur}
                                />
                                {formik1.errors.description && formik1.touched.description ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.description}</p>
                                ) : null}
                            </div>
                            <div className='form-group mt-2'>
                                <label>Date <span style={{ color: 'red' }}>*</span> </label>
                                <input
                                    type='date'
                                    name='date'
                                    style={{ fontSize: '12px' }}
                                    value={formik1.values.date}
                                    className='form-control mt-2'
                                    onChange={formik1.handleChange}
                                    onBlur={formik1.handleBlur}
                                />
                                {formik1.errors.date && formik1.touched.date ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.date}</p>
                                ) : null}
                            </div>
                            <div className='form-group mt-2'>
                                <label >Amount <span style={{ color: 'red' }}>*</span> </label>
                                <input
                                    type='number'
                                    placeholder='Amount'
                                    name='amount'
                                    value={formik1.values.amount}
                                    className='form-control mt-2'
                                    onChange={formik1.handleChange}
                                    onBlur={formik1.handleBlur}
                                />
                                {formik1.errors.amount && formik1.touched.amount ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.amount}</p>
                                ) : null}
                            </div>
                            <div className='d-flex mt-3' style={{ justifyContent: 'flex-end' }}>
                                <button type='submit' className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>Update</button>
                            </div>
                        </form>
                    </Dialog>
                )
            }

            <Dialog
                header={
                    <div className='d-flex' style={{ justifyContent: "space-between" }}>
                        <h4> PDF Preview </h4>
                        {pdfUrl && (
                            <button
                                onClick={downloadPdf}
                                style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                            >
                                <DownloadIcon />
                            </button>
                        )}
                        {/* <button onClick={downloadPdf} style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}> <DownloadIcon /></button> */}
                    </div>
                }
                visible={pdfVisible}
                onHide={() => setPdfVisible(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '1440px': '80vw', '960px': '75vw', '641px': '100vw' }}
            >
                <div style={{ height: '70vh' }}>
                    {loading ? (
                        <p>Loading PDF...</p>
                    ) : (
                        pdfUrl ? (
                            <iframe
                                src={pdfUrl}
                                title="PDF Preview"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                            />
                        ) : (

                            <p style={{ textAlign: 'center' }}>No PDF to display.</p>
                        )
                    )}
                </div>
            </Dialog>




        </>
    );
};

export default ManageExpense;
