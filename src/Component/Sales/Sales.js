import React, { useState, useRef, useEffect } from 'react';
import './Sales.css'
import { useNavigate, Link } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { salesGetThunk } from '../../Redux/Thunk/Sales/Salesget';
import BeatLoader from "react-spinners/BeatLoader";
import { salesDeleteThunk } from '../../Redux/Thunk/Sales/DeleteSales';
import { salesFetchThunk } from '../../Redux/Thunk/Sales/FetchSales';
import { salesFetchProductThunk } from '../../Redux/Thunk/Sales/FetchProduct';
import { salesXlThunk } from '../../Redux/Thunk/Sales/XLdownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { salesWordThunk } from '../../Redux/Thunk/Sales/WordSale';
import { Dialog } from 'primereact/dialog';
import DownloadIcon from '@mui/icons-material/Download';

const Sales = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteId, setDeleteId] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfVisible, setPdfVisible] = useState(false)

    const { loading, data } = useSelector((state) => state.saleWord);

    const navigate = useNavigate()
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

    const newSale = () => {
        navigate('/newSales')
    }

    useEffect(() => {
        dispatch(salesGetThunk())
    }, [])

    const salesData = useSelector((state) => state.salesGetData?.data?.data)
    const salesLoading = useSelector((state) => state.salesGetData?.loading)

    const filterSalesData = salesData?.filter((sales) =>
        sales.salesNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sales.poultryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sales.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sales.salesDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sales.totalPayable.toLowerCase().includes(searchTerm.toLowerCase())

    );
    // console.log("salesLoading", salesLoading)
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

    const resetSearch = () => {
        setSearchTerm('')
    }
    const handleDelete = (id) => {
        setDeleteId(id)
    }
    const salesDelete = async () => {
        await dispatch(salesDeleteThunk(deleteId))
        await dispatch(salesGetThunk())
        toast.success("Sale deleted successfully", {
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

    const fetchValues = useSelector((state) => state.saleFetchData?.data?.data)

    const updateSales = (item) => {

        navigate('/updateSale', { state: { user: item } });
        console.log('values', item)

    }

    const linkEdit = (item) => {

        navigate('/updateSale', { state: { user: item } });
        console.log('values', item)

    }

    const handleExcelExport = (values) => {
        dispatch(salesXlThunk(values)).then((action) => {
            if (action.payload && action.meta.requestStatus === 'fulfilled') {
                const blob = new Blob([action.payload], { type: 'application/vnd.ms-excel' });
                const downloadUrl = window.URL.createObjectURL(blob);

                //this is temporary link
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'Sales.xlsx');

                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        });
    };
    // const handleWord = ({ id }) => {
    //     dispatch(salesWordThunk(id)).then((action) => {
    //         if (action.payload && action.meta.requestStatus === 'fulfilled') {
    //             const blob = new Blob([action.payload], { type: 'application/pdf' })
    //             const deownloadURL = window.URL.createObjectURL(blob)

    //             const link = document.createElement('a')
    //             link.href = deownloadURL
    //             link.setAttribute('download', 'Sales')

    //             document.body.appendChild(link)
    //             link.click()
    //             link.remove()
    //         }
    //     })
    // }
    
    const handleWord = ({id}) => {
        setPdfVisible(true);
        dispatch(salesWordThunk(id)).then((action) => {
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
    return (
        <>
            <div className='salesContainer'>

                <div className='row'>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6'>
                        <h5>Sales</h5>
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end'>
                        <button className='newSalesButton' onClick={newSale}  >
                            + New Sale
                        </button>
                    </div>

                </div>
                <div className='card mt-3 saleCard'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-start gap-2'>
                                <div className='form-group'>
                                    <label htmlFor="Poultry" className='saleRowLabel'>Sale No <span style={{ color: 'red' }}>*</span> </label>
                                    <input type="text" className='form-control mt-2' placeholder='Search by SaleNo...' value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <button className='resetSaleButton' onClick={resetSearch}><RestartAltIcon /></button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='saleTable'>
                    {
                        salesLoading ? (
                            <div style={overlayStyle}>
                                <div style={{ textAlign: "center" }}>
                                    <BeatLoader
                                        loading={salesLoading}
                                        cssOverride={override}
                                        size={30}
                                        color={"#f8f9fa"}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            </div>
                        ) : filterSalesData && filterSalesData.length > 0 ? (
                            <table className="table mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Sale No</th>
                                        <th>Poultry</th>
                                        <th>Customer</th>
                                        <th>Sale Date</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterSalesData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <button
                                                        onClick={() => linkEdit(item)}
                                                        style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                                    >
                                                        {item.salesNo}
                                                    </button>
                                                </td>
                                                {/* <td><Link to="#" onClick={()=>linkEdit(item)}> {item.salesNo} </Link></td> */}
                                                <td>{item.poultryName}</td>
                                                <td>{item.customerName}</td>
                                                <td>{item.salesDate}</td>
                                                <td>{item.totalPayable}</td>
                                                <td>
                                                    <div className="dropdown"  >
                                                        <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  >
                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu" >
                                                            <li className="dropdown-item"><button className="editSaleButton" onClick={() => updateSales(item)}>Edit</button></li>
                                                            <li className="dropdown-item"><button className="deleteSaleButton" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleDelete(item.id)}>Delete</button></li>
                                                            <li className="dropdown-item"><button className="viewSaleButton" onClick={() => handleWord(item)}>View</button></li>
                                                            <li className="dropdown-item"><button className="excelSaleButton" onClick={() => handleExcelExport(item)}>Excel</button></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className="table mt-3" >
                                <thead>
                                    <tr className='table-primary'>
                                        <th>S.No</th>
                                        <th>Sale No</th>
                                        <th>Poultry</th>
                                        <th>Customer</th>
                                        <th>Sale Date</th>
                                        <th>Total</th>
                                        <th>Action</th>
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
                    {/* <table className="table mt-3" >
                        <thead>
                            <tr className='table-primary'>
                                <th>S.No</th>
                                <th>SALE NO</th>
                                <th>POULTRY</th>
                                <th>CUSTOMER</th>
                                <th>SALE DATE</th>
                                <th>TOTAL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                salesLoading ? (
                                    <div style={overlayStyle}>
                                        <div style={{ textAlign: "center" }}>
                                            <BeatLoader
                                                loading={salesLoading}
                                                cssOverride={override}
                                                size={30}
                                                color={"#f8f9fa"}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    </div>
                                ) : filterSalesData && filterSalesData.length > 0 ? (
                                    filterSalesData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link> {item.salesNo} </Link></td>
                                            <td>{item.poultryName}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.salesDate}</td>
                                            <td>{item.totalPayable}</td>
                                            <td>
                                                <div className="dropdown"  >
                                                    <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  >
                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <ul className="dropdown-menu" >
                                                        <li className="dropdown-item"><button className="editSaleButton" onClick={()=>updateSales(item)}>Edit</button></li>
                                                        <li className="dropdown-item"><button className="deleteSaleButton" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleDelete(item.id)}>Delete</button></li>
                                                        <li className="dropdown-item"><button className="viewSaleButton">View</button></li>
                                                        <li className="dropdown-item"><button className="excelSaleButton" onClick={()=>handleExcelExport(item)}>Excel</button></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                            <p>No Data Found</p>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table> */}
                </div>
            </div>


            {/*delete Modal */}

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
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={salesDelete}>ok</button>
                        </div>

                    </div>
                </div>
            </div>




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

export default Sales;
