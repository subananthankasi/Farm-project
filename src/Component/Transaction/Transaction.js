import React, { useEffect, useState } from 'react';
import './Transaction.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { transPoultryGetThunk } from '../../Redux/Thunk/Transaction/PoultryGet';
import { transactionGetThunk } from '../../Redux/Thunk/Transaction/TransactionGet';
import { transactionSearchThunk } from '../../Redux/Thunk/Transaction/Search';
import BeatLoader from "react-spinners/BeatLoader";
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Select from 'react-select';

const Transaction = () => {

    const dispatch = useDispatch()
    const [isTriggered, setIsTriggered] = useState(false)
    const [searchTerm, setSearchTerm] = useState(''); // To store the search ter
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(transactionGetThunk())
        dispatch(transPoultryGetThunk())
    }, [])

    const poultryData = useSelector((state) => state.transactionPoultry?.data?.data)
    const transactionData = useSelector((state) => state.transactionData?.data?.data)
    const transactionLoading = useSelector((state) => state.transactionData?.loading)
    const searchData = useSelector((state) => state.transactionSearch?.data?.data)

    const poultryOptions = poultryData?.map((item) => ({
        value: item.poultryName,
        label: item.poultryName,
    }));
    // const filteredPoultryData = poultryData.filter((item) =>
    //     item.poultryName.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // const handleSelect = (poultryName) => {
    //     formik1.setFieldValue('poultryName', poultryName); // Set the selected value in Formik
    //     setSearchTerm(poultryName); // Set the input value to the selected option
    //     setIsDropdownOpen(false); // Close the dropdown
    // };
    // console.log('transactionData',transactionData)

    const formik1 = useFormik({
        initialValues: {
            poultryName: '',
            startDate: '',
            endDate: ''
        },
        validationSchema: yup.object().shape({
            startDate: yup.date().required('required!!'),
            endDate: yup.date().required('required!!')
        }),
        onSubmit: (values) => {
            dispatch(transactionSearchThunk(values))
            setIsTriggered(true);
        }
    })
    const handleButtonClick = (action) => {

        const formValues = formik1.values;

        switch (action) {
            case 'filter':
                formik1.handleSubmit();
                break;
            case 'reset':
                handleReset(formValues);
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        formik1.resetForm()
        setIsTriggered(false)
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

            <div className='transReadContainer'>
                <div className='transaction'>
                    <h5>Transaction</h5>
                </div>
                <div className='card '>
                    <div className='card-body'>
                        <form onSubmit={formik1.handleSubmit}>
                            <div className='row'>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12 '>
                                    <div className='form-group'>
                                        <label htmlFor="Poultry" className='transRowLabel'>Poultry </label>
                                        {/* <select
                                            name="poultryName"
                                            id="poultryName"
                                            style={{ fontSize: '12px' }}
                                            value={formik1.values.poultryName}
                                            className='form-control mt-2'
                                            onChange={formik1.handleChange}
                                            onBlur={formik1.handleBlur}
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
                                            className="mt-2" 
                                            styles={{
                                                control: (base) => ({
                                                  ...base,
                                                  fontSize: '12px',      
                                                  minHeight: '28px',          
                                                  padding: '0px',  
                                                //   width:'150px'           
                                                }),
                                                valueContainer: (base) => ({
                                                  ...base,
                                                  padding: '0px 8px',         
                                                }),
                                                indicatorsContainer: (base) => ({
                                                  ...base,
                                                  height: '28px',   
                                                //   width:'150px',      
                                                  display:'none'       
                                                }),
                                              }}
                                            options={poultryOptions}  
                                            value={poultryOptions?.find(option => option.value === formik1.values.poultryName)}  // Set selected value from formik
                                            onChange={(selectedOption) => formik1.setFieldValue('poultryName', selectedOption?.value)} // Handle value change in formik
                                            onBlur={formik1.handleBlur} 
                                            placeholder="Search Poultry..."
                                            isSearchable 
                                        />
                                    </div>

                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <div className='form-group'>

                                        <label htmlFor="" className='transRowLabel'> Start Date <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="date"
                                            name='startDate'
                                            className='form-control mt-2'
                                            style={{ fontSize: '12px' }}
                                            value={formik1.values.startDate}
                                            onChange={formik1.handleChange}
                                            onBlur={formik1.handleBlur}
                                        />
                                        {formik1.errors.startDate && formik1.touched.startDate ? (
                                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.startDate}</p>
                                        ) : null}
                                    </div>

                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="" className='transRowLabel'> End Date <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="date"
                                            name='endDate'
                                            className='form-control mt-2'
                                            style={{ fontSize: '12px' }}
                                            value={formik1.values.endDate}
                                            onChange={formik1.handleChange}
                                            onBlur={formik1.handleBlur}
                                        />
                                        {formik1.errors.endDate && formik1.touched.endDate ? (
                                            <p style={{ color: "red", fontSize: '12px' }}>{formik1.errors.endDate}</p>
                                        ) : null}
                                    </div>


                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12 d-flex justify-content-start align-items-center text-center gap-2 mt-4' >
                                    <button className='filterTransactionButton' type='submit' onClick={() => handleButtonClick('filter')}>  <FilterListIcon /> </button>
                                    <button className='resetTransactionButton' type='button' onClick={() => handleButtonClick('reset')}> <RestartAltIcon /></button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className='transactionTable'>
                    {
                        transactionLoading ? (
                            <div style={overlayStyle}>
                                <div style={{ textAlign: "center" }}>
                                    <BeatLoader
                                        loading={transactionLoading}
                                        cssOverride={override}
                                        size={30}
                                        color={"#f8f9fa"}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            </div>
                        ) : isTriggered && searchData && searchData.length > 0 ? (
                            <table className="table table-hover mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Transaction</th>
                                        <th>Product</th>
                                        <th>Poultry</th>
                                        <th>Transaction Date</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>


                                                {/* background-color: aquamarine;
                                                        border-radius: 11px;
                                                        justify-content: center;
                                                        display: flex;
                                                        width: 80px;
                                                        font-size: 12px;
                                                        padding: 3px;
                                                        font-weight: 800; */}

                                                <td>
                                                    <p
                                                        style={{
                                                            backgroundColor: item.transactionType === 'IMPORT'
                                                                ? ' #FBC4AB'
                                                                : item.transactionType === 'EXPORT'
                                                                    ? '#B9E4C9'
                                                                    : 'transparent',
                                                            display: 'flex',
                                                            width: '80px',
                                                            borderRadius: '11px',
                                                            justifyContent: 'center',
                                                            fontWeight: '500',
                                                            padding: '3px',
                                                        }}
                                                    > {item.transactionType}
                                                    </p>
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>{item.poultryName}</td>
                                                <td>{item.transactionDate}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : !isTriggered && transactionData && transactionData.length > 0 ? (
                            <table className="table table-hover mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Transaction</th>
                                        <th>Product</th>
                                        <th>Poultry</th>
                                        <th>Transaction Date</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactionData?.map((item, index) => (
                                            <tr key={index}
                                            >
                                                <td>{index + 1}</td>
                                                <td>
                                                    <p
                                                        style={{
                                                            backgroundColor: item.transactionType === 'IMPORT'
                                                                ? ' #FBC4AB'
                                                                : item.transactionType === 'EXPORT'
                                                                    ? '#B9E4C9'
                                                                    : 'transparent',
                                                            display: 'flex',
                                                            width: '80px',
                                                            borderRadius: '11px',
                                                            justifyContent: 'center',
                                                            fontWeight: '500',
                                                            padding: '3px',

                                                        }}
                                                    > {item.transactionType}
                                                    </p>
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>{item.poultryName}</td>
                                                <td>{item.transactionDate}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className="table table-hover mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Transaction</th>
                                        <th>product</th>
                                        <th>poultry</th>
                                        <th>Transaction Date</th>
                                        <th>Total</th>
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
                        )
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Transaction;
