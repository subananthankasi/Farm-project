import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import './NewSales.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { salesCustomerGetThunk } from '../../Redux/Thunk/Sales/CustomerGet';
import { salesPoultryGetThunk } from '../../Redux/Thunk/Sales/PoultryGet';
import { salesProductGetThunk } from '../../Redux/Thunk/Sales/ProductGet';
import { salesCreateThunk } from '../../Redux/Thunk/Sales/CreateSale';
import { salesFetchThunk } from '../../Redux/Thunk/Sales/FetchSales';
import { salesFetchProductThunk } from '../../Redux/Thunk/Sales/FetchProduct';
import { salesUpdateThunk } from '../../Redux/Thunk/Sales/UpdateSaleThunk';

const UpdateSale = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const [selectedPoultryId, setSelectedPoultryId] = useState(null)
    const [selectedPoultryData, setSelectedPoultryData] = useState([])

    const [sales, setsales] = useState([
        {
            productId: '',
            quantity: '',
            rate: '',
            amount: '',
            id: null,
            salesId: null
        }
    ]);
    const saleToUpdate = location.state?.user;
    console.log('saleToUpdate', saleToUpdate)

    useEffect(() => {
        if (saleToUpdate) {
            dispatch(salesFetchThunk(saleToUpdate))
            dispatch(salesFetchProductThunk(saleToUpdate))
        }

    }, [])
    const formatDateYearMonthDay = (value) => {
        if (!value) return '';

        const [year, month, day] = value.split('-');
        return [year, month, day].filter(Boolean).join('/');
    };


    const validationSchema = yup.object().shape({
        customerId: yup.string().required("*required!!"),
        poultryId: yup.string().required("*required!!"),
        salesDate: yup.date().required("*required!!"),
        deliveryDate: yup.date().required("*required!!"),
        salesNote: yup.string().required("*required!!"),
        subTotal: yup.number().required("*required!!"),
        discount: yup.number().required("*required!!"),
        totalPayable: yup.number().required("*required!!"),
        sales: yup.array().of(
            yup.object().shape({
                productId: yup.string().required("*required!!"),
                quantity: yup.string().required("*required!!"),
                rate: yup.number().required("*required!!"),
                amount: yup.number().required("*required!!"),
            })
        )
    });



    const formik = useFormik({
        initialValues: {
            customerId: '',
            poultryId: '',
            salesDate: '',
            deliveryDate: '',
            salesNote: '',
            subTotal: '',
            discount: '',
            totalPayable: '',
            salesNo: null,
            status: 'ACTIVE',
            id: null,
            sales: sales
        },
        validationSchema,
        onSubmit: async (values) => {
            const errors = await formik.validateForm();
            // navigate('/sales')
            if (Object.keys(errors).length === 0) {

                console.log('Editing values:', values);

                try {

                    const formattedSaleDate = formatDateYearMonthDay(values.salesDate);
                    const formattedDeliveryDate = formatDateYearMonthDay(values.deliveryDate);


                    const valuesToDispatch = {
                        ...values,
                        salesDate: formattedSaleDate,
                        deliveryDate: formattedDeliveryDate
                    };
                    const response = await dispatch(salesUpdateThunk(valuesToDispatch))
                    if (salesUpdateThunk.fulfilled.match(response)) {
                        const success = response.payload.data

                        // console.log('success', success)
                        formik.resetForm();
                        toast.success("Sale created successfully.", {
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
                        navigate('/sales');

                    }
                    else if (salesUpdateThunk.rejected.match(response)) {
                        const errorMessage = response.payload.reason
                        console.log('errorMessage', errorMessage)
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
                    console.log('error', error)
                }


            } else {
                formik.setTouched({
                    customerId: true,
                    poultry: true,
                    saleDate: true,
                    deliveryDate: true,
                    saleNotes: true,
                    subTotals: true,
                    discountAmounts: true,
                    totalPayables: true,
                    sales: formik.values.sales.map(() => ({
                        product: true,
                        quantity: true,
                        rate: true,
                        amount: true,
                    })),
                });
            }
        }

    });

    const handleAddRow = (e) => {
        e.preventDefault();
        formik.setValues({
            ...formik.values,
            sales: [...formik.values.sales, { product: '', quantity: '', rate: '', amount: '' }]
        });
    };

    const handleRemoveRow = (index) => {
        if (index === 0) {
            toast.error("You cannot deleted", {
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
            return;
        }

        const updatedsales = formik.values.sales.filter((_, i) => i !== index);
        formik.setValues({ ...formik.values, sales: updatedsales });

        formik.setFieldValue('subTotal', calculateSubTotal(updatedsales));
        toast.success("deleted successfully", {
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
    };

    //fetchValues

    const fetchValues = useSelector((state) => state.saleFetchData?.data?.data)
    console.log('fetchValues', fetchValues)

    useEffect(() => {
        if (fetchValues) {
            formik.setFieldValue('salesNo', fetchValues?.salesNo || '');
            formik.setFieldValue('customerId', fetchValues?.customerId || '');
            formik.setFieldValue('poultryId', fetchValues?.poultryId || '');
            formik.setFieldValue('salesNote', fetchValues?.salesNotes || '');
            formik.setFieldValue('subTotal', fetchValues?.subTotal || '');
            formik.setFieldValue('discount', fetchValues?.discount || '');
            formik.setFieldValue('totalPayable', fetchValues?.totalPayable || '');
            formik.setFieldValue('id', fetchValues?.id || '');

            formik.setFieldValue('deliveryDate', fetchValues?.deliveryDate ? new Date(fetchValues?.deliveryDate).toISOString().split('T')[0] : '');
            formik.setFieldValue('salesDate', fetchValues?.salesDate ? new Date(fetchValues?.salesDate).toISOString().split('T')[0] : '');

            if (fetchValues.sales && fetchValues.sales.length > 0) {
                fetchValues.sales.forEach((sale, index) => {
                    formik.setFieldValue(`sales[${index}].productId`, sale.productId || '');
                    formik.setFieldValue(`sales[${index}].quantity`, sale.quantity || '');
                    formik.setFieldValue(`sales[${index}].rate`, sale.rate || '');
                    formik.setFieldValue(`sales[${index}].amount`, sale.amount || '');
                    formik.setFieldValue(`sales[${index}].id`, sale.id || '');
                    formik.setFieldValue(`sales[${index}].salesId`, sale.salesId || '');

                });
            }
        }
    }, [fetchValues])


    const customerData = useSelector((state) => state.salesCustomer?.data?.data)
    const poultryData = useSelector((state) => state.salesPoultryGet?.data?.data)
    // const productData = useSelector((state) => state.salesProduct?.data?.data)
    const productData = useSelector((state) => state.saleFetchProduct?.data?.data)

    console.log('productData', productData)

    // saleFetchProduct
    useEffect(() => {
        dispatch(salesCustomerGetThunk())
        dispatch(salesPoultryGetThunk())
    }, [])
    const handlePoultryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedPoultryId(selectedId);
        formik.handleChange(e);
    };
    useEffect(() => {
        const fetchStateData = async () => {
            try {
                if (selectedPoultryId) {
                    const response = await dispatch(salesProductGetThunk(selectedPoultryId));
                    // console.log('Fetched State Data:', response);

                    if (salesProductGetThunk.fulfilled.match(response)) {
                        setSelectedPoultryData(response.payload.data);

                        if (response.payload.data.length > 0) {
                            const matchedState = response.payload.data.find(state => state.id === formik.values.productId);
                            if (matchedState) {
                                formik.setFieldValue('productId', formik.values.productId);
                            } else {
                                console.log('poultryId not found in fetched data.');
                            }
                        }
                    } else {
                        console.error('Failed to fetch salePoultry data:', response.error.message);
                    }
                }
            } catch (error) {
                console.log('stateGetError:', error);
            }
        };

        if (selectedPoultryId) {
            fetchStateData();
        }
    }, [selectedPoultryId, dispatch]);




    const calculateSubTotal = (sales) => {
        return sales.reduce((acc, sale) => acc + (sale.amount || 0), 0);
    };

    const handleQuantityChange = (e, index) => {
        const quantity = Number(e.target.value || 0);
        formik.setFieldValue(`sales[${index}].quantity`, quantity);

        const rate = Number(formik.values.sales[index].rate || 0);
        const amount = quantity * rate;
        formik.setFieldValue(`sales[${index}].amount`, amount);


        const newSales = formik.values.sales.map((sale, i) =>
            i === index ? { ...sale, amount } : sale
        );
        formik.setFieldValue('subTotal', calculateSubTotal(newSales));
    };

    const handleRateChange = (e, index) => {
        const rate = Number(e.target.value || 0);
        formik.setFieldValue(`sales[${index}].rate`, rate);

        const quantity = Number(formik.values.sales[index].quantity || 0);
        const amount = quantity * rate;
        formik.setFieldValue(`sales[${index}].amount`, amount);


        const newSales = formik.values.sales.map((sale, i) =>
            i === index ? { ...sale, amount } : sale
        );
        formik.setFieldValue('subTotal', calculateSubTotal(newSales));
    };
    return (
        <>

            <div className='container-fluid updateSaleContainer' style={{ minHeight: '100%' }}>

                <div className='row'>
                    <div className='col'>
                        <h5 className='salesss'>Sale</h5>
                    </div>
                    <nav className='col-12 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-sm-end justify-content-start'>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'> <Link to={'/dashboard'} style={{ textDecoration: 'none' }} >HOME</Link>  </li>
                            <li className='breadcrumb-item'> <Link to={'/sales'} style={{ textDecoration: 'none' }} >SALE</Link> </li>
                            <li className='breadcrumb-item active'> UPDATE SALE </li>
                        </ol>
                    </nav>
                </div>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='card  '>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-12 col-lg-2 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="salesNo" className='newSaleRowLabel'>Sales No <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            name="salesNo"
                                            id="salesNo"
                                            style={{ fontSize: '13px' }}
                                            className='form-control mt-2'
                                            value={formik.values.salesNo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                    </div>

                                    {formik.errors.salesNo && formik.touched.salesNo ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.salesNo} </p> : null}
                                </div>
                                <div className='col-12 col-lg-2 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="Customer" className='newSaleRowLabel'>Customer <span style={{ color: 'red' }}>*</span> </label>
                                        <select
                                            name="customerId"
                                            id="customerId"
                                            style={{ fontSize: '13px' }}
                                            placeholder='selectCustomer'
                                            className='form-control mt-2'
                                            value={formik.values.customerId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option selected >Select customerId</option>
                                            {
                                                customerData?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name} </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    {formik.errors.customerId && formik.touched.customerId ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.customerId} </p> : null}
                                </div>
                                <div className='col-12 col-lg-2 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleRowLabel'>Poultry <span style={{ color: 'red' }}>*</span> </label>
                                        <select
                                            name="poultryId"
                                            id="poultryId"
                                            style={{ fontSize: '13px' }}
                                            className='form-control mt-2'
                                            value={formik.values.poultryId}
                                            onChange={handlePoultryChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value={''} >Select Poultry</option>
                                            {
                                                poultryData?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.poultryName} </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    {formik.errors.poultryId && formik.touched.poultryId ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.poultryId} </p> : null}

                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleRowLabel'> Sale Date <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="date"
                                            style={{ fontSize: '13px' }}
                                            className='form-control mt-2'
                                            name='salesDate'
                                            value={formik.values.salesDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>

                                    {formik.errors.salesDate && formik.touched.salesDate ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.salesDate} </p> : null}
                                </div>
                                <div className='col-12 col-lg-3 col-md-6 col-sm-12'>
                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleRowLabel'> Delivery Date <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="date"
                                            name='deliveryDate'
                                            style={{ fontSize: '13px' }}
                                            className='form-control mt-2'
                                            value={formik.values.deliveryDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>

                                    {formik.errors.deliveryDate && formik.touched.deliveryDate ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.deliveryDate} </p> : null}

                                </div>
                            </div>
                            <div className='row mt-4 newSaleTbale'>

                                <table className="table mt-3">
                                    <thead>
                                        <tr className='table-secondary'>
                                            <th>S.No</th>
                                            <th>Product<span style={{ color: 'red' }}>*</span></th>
                                            <th>Quantity<span style={{ color: 'red' }}>*</span></th>
                                            <th>Rate<span style={{ color: 'red' }}>*</span></th>
                                            <th>Amount<span style={{ color: 'red' }}>*</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formik.values.sales.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <select
                                                        type='text'
                                                        name={`sales[${index}].productId`}
                                                        className='form-control newSaleinput'
                                                        style={{ fontSize: '13px' }}
                                                        value={formik.values.sales[index].productId}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    >
                                                        {/* <option value=''>Select Product</option> */}
                                                        {productData && productData.length > 0 ? productData?.map((item) => (
                                                            <option key={item.id} value={item.id}>{item.productName} </option>
                                                        )) : (
                                                            <option >No Data Found </option>
                                                        )}
                                                     

                                                        {formik.errors.sales?.[index]?.productId && formik.touched.sales?.[index]?.productId ? (
                                                            <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.sales[index].productId}</p>
                                                        ) : null}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        name={`sales[${index}].quantity`}
                                                        style={{ fontSize: '13px' }}
                                                        className='form-control newSaleinput'
                                                        value={formik.values.sales[index].quantity}
                                                        onChange={(e) => handleQuantityChange(e, index)}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.errors.sales?.[index]?.quantity && formik.touched.sales?.[index]?.quantity ? (
                                                        <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.sales[index].quantity}</p>
                                                    ) : null}
                                                </td>
                                                <td>
                                                    <input
                                                        type='number'
                                                        name={`sales[${index}].rate`}
                                                        className='form-control newSaleinput'
                                                        style={{ fontSize: '13px' }}
                                                        value={formik.values.sales[index].rate}
                                                        onChange={(e) => handleRateChange(e, index)}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.errors.sales?.[index]?.rate && formik.touched.sales?.[index]?.rate ? (
                                                        <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.sales[index].rate}</p>
                                                    ) : null}
                                                </td>
                                                <td className='d-flex gap-3 me-auto align-items-start'>
                                                    <div className='d-flex flex-column'>
                                                        <input
                                                            type='number'
                                                            style={{ fontSize: '13px' }}
                                                            name={`sales[${index}].amount`}
                                                            className='form-control newSaleinput'
                                                            value={formik.values.sales[index].amount}
                                                            readOnly
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        {formik.errors.sales?.[index]?.amount && formik.touched.sales?.[index]?.amount ? (
                                                            <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.sales[index].amount}</p>
                                                        ) : null}
                                                    </div>
                                                    <span>
                                                        <button
                                                            className='deleteIcon'
                                                            type='button'
                                                            onClick={() => handleRemoveRow(index)}
                                                        >
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        </button>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='plusButton' type='button' onClick={handleAddRow}><i className="fa-solid fa-circle-plus" style={{ color: 'blue', fontSize: '12px' }}></i> Add</button>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6 col-lg-6 col-md-6 col-sm-6' style={{ height: '100%' }}>
                                    <div className='form-group' >
                                        <label htmlFor="saleNotes" className='newSaleLabel' > Sale Notes <span style={{ color: 'red' }}>*</span> </label>
                                        <textarea
                                            name="salesNote"
                                            id="salesNote"
                                            className='form-control mt-2'
                                            style={{ height: '200px' }}
                                            value={formik.values.salesNote}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                        </textarea>
                                    </div>

                                    {formik.errors.salesNote && formik.touched.salesNote ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.salesNote} </p> : null}
                                </div>
                                <div className='col-6 col-lg-6 col-md-6 col-sm-6 d-flex ' style={{ justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleLabel mt-2'>Sub Totals <span style={{ color: 'red' }}>*</span>  </label>
                                        <input
                                            type="number"
                                            name='subTotal'
                                            className='form-control mt-2'
                                            style={{ width: '100%' }}
                                            value={formik.values.subTotal}
                                            // onChange={formik.handleChange}
                                            readOnly
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.subTotal && formik.touched.subTotal ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.subTotal} </p> : null}
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleLabel mt-2'>Discount Amounts <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="number"
                                            name='discount'
                                            className='form-control mt-2'
                                            style={{ width: '100%' }}
                                            value={formik.values.discount}
                                            // onChange={formik.handleChange}
                                            onChange={(e) => {
                                                const discount = Number(e.target.value || 0);
                                                formik.setFieldValue('discount', discount);
                                                const subTotal = Number(formik.values.subTotal || 0);
                                                const totalPayable = subTotal - discount;
                                                formik.setFieldValue('totalPayable', totalPayable);

                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.discount && formik.touched.discount ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.discount} </p> : null}
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="" className='newSaleLabel mt-2'>Total Payables <span style={{ color: 'red' }}>*</span> </label>
                                        <input
                                            type="number"
                                            name='totalPayable'
                                            className='form-control mt-2'
                                            style={{ width: '100%' }}
                                            value={formik.values.totalPayable}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.totalPayable && formik.touched.totalPayable ? <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.totalPayable} </p> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex' style={{ justifyContent: 'flex-end', marginRight: '20px', marginBottom: '10px' }}>
                            <button className='btn btn-primary btn-sm' type='submit' >Update</button>
                        </div>
                    </div>

                    {/*button space */}


                </form>
            </div>

        </>
    );
};

export default UpdateSale;
