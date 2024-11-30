import React, { useEffect, useState } from 'react';
import './PoultryBreed.css'
import { useNavigate, Link } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { poultryBreedPageGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedGet';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import { poultryBreedPoultryGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedPoultryGet';
import { poultryBreedSearchThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedSearch';
import BeatLoader from "react-spinners/BeatLoader";
import { poultryBreedDeleteThunk } from '../../Redux/Thunk/PoultryBreed/DeletePoultryBreed';
import { poultryBreedXlThunk } from '../../Redux/Thunk/PoultryBreed/XlPoultryBreedThunk';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { poultryWordThunk } from '../../Redux/Thunk/PoultryBreed/WordPoultryBreed';
import Select from 'react-select';
import { Dialog } from 'primereact/dialog';
import DownloadIcon from '@mui/icons-material/Download';


const PoultryBreed = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState('')
    const [isTriggered, setIsTriggered] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfVisible, setPdfVisible] = useState(false)

    const { loading, data } = useSelector((state) => state.poultryBreedWord);



    const newPoultryBreed = () => {
        navigate('/newPoultryBreed')
    }



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



    useEffect(() => {
        dispatch(poultryBreedPageGetThunk())
        dispatch(poultryBreedPoultryGetThunk())
    }, [])

    const wholeData = useSelector((state) => state.poultryBreedGetData?.data?.data)
    const wholeDataLoading = useSelector((state) => state.poultryBreedGetData?.loading)
    const poultryData = useSelector((state) => state.poultryBreedPoultryGet?.data?.data)
    const searchValues = useSelector((state) => state.polutrySearchData?.data?.data)

    // console.log('searchValues',searchValues);

const poultryOptions = poultryData?.map((item) => ({
    value: item.poultryName,
    label: item.poultryName,
  }));

    const handleEdit = (item) => {
        navigate('/updatePoultryBreed', { state: { poultry: item } })
        console.log('handleEdit')
    }

    const handleDelete = (id) => {
        setDeleteId(id)
        // console.log('handleDelete',id)
    }
    const okDltModal = () => {
        dispatch(poultryBreedDeleteThunk(deleteId)).then(() => {
            dispatch(poultryBreedPageGetThunk());

            toast.success("PoultryBreed  deleted successfully", {
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

    const handleExportExcel = (item) => {

        dispatch(poultryBreedXlThunk(item)).then((response) => {
            if (response.payload && response.meta.requestStatus === 'fulfilled') {
                const blob = new Blob([response.payload], { type: 'application/vnd.ms-excel' })
                const downloadUrl = window.URL.createObjectURL(blob)

                const link = document.createElement('a')
                link.href = downloadUrl
                link.setAttribute('download', 'PoultryBreed.xlsx');

                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        })
        console.log('handleExportExcel')
    }

    // const handleView = ({ id }) => {
    //     dispatch(poultryWordThunk(id)).then((action) => {
    //         if (action.payload && action.meta.requestStatus === 'fulfilled') {
    //             const blob = new Blob([action.payload], { type: 'application/pdf' })
    //             const downloadUrl = window.URL.createObjectURL(blob)

    //             const link = document.createElement('a')
    //             link.href = downloadUrl
    //             link.setAttribute('download', 'PoultryBreed.pdf')

    //             document.body.appendChild(link)
    //             link.click()
    //             link.remove()
    //         }
    //     })
    // }
    const handleView = ({id}) => {
        setPdfVisible(true);
        dispatch(poultryWordThunk(id)).then((action) => {
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

    const filterPoultry = () => {
        dispatch(poultryBreedSearchThunk(searchData))
        setIsTriggered(true);
        // console.log('search',searchData)
    }
    const resetPoultry = () => {
        setSearchData(null)
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
            <div className='poultryBreedContainer'>


                <div className='row poultry '>
                    <div className='col-6 col-lg-6 col-md-6 sm-6'>
                        <h5 >Poultry Breed</h5>
                    </div>
                    <div className='col-6 col-lg-6 col-md-6 sm-6 d-flex justify-content-end'>
                        <button className='newPoultryButton' onClick={newPoultryBreed}>
                            + New Poultry
                        </button>
                    </div>
                </div>

                <div className='card'>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-12 col-md-12 col-sm-12  d-flex gap-2 justify-content-start'>
                                <div className='form-group'>
                                    <label htmlFor="Poultry" className='poultryRowLabel' >Poultry <span style={{ color: 'red' }}>*</span> </label>
                                    {/* <select 
                                        className='form-control mt-2 w-100 '
                                        style={{ fontSize: '12px'}} 
                                        onChange={(e)=>setSearchData(e.target.value)}
                                        value={searchData}
                                    >
                                        <option>Search Poultry... </option>
                                        {
                                            poultryData?.map((item)=>(
                                                <option key={item.id} value={item.poultryName} >{item.poultryName} </option>
                                            ))
                                        }
                                    </select> */}
                                    <Select
                                        className=" mt-2 w-100"  
                                        styles={{
                                            control: (base) => ({
                                              ...base,
                                              fontSize: '12px',      
                                              minHeight: '28px',          
                                              padding: '0px',  
                                              width:'150px'           
                                            }),
                                            valueContainer: (base) => ({
                                              ...base,
                                              padding: '0px 8px',         
                                            }),
                                            indicatorsContainer: (base) => ({
                                              ...base,
                                              height: '28px',   
                                              width:'150px',      
                                              display:'none'       
                                            }),
                                          }}
                                        placeholder="Search Poultry..."
                                        options={poultryOptions} 
                                         value={searchData ? poultryOptions?.find(option => option.value === searchData) : null}      
                                        // value={poultryOptions?.find(option => option.value === searchData)}  
                                        onChange={(selectedOption) => setSearchData(selectedOption?.value)}
                                        isSearchable                    
                                    />
                                </div>

                                <button className='filterPoultryButton' onClick={filterPoultry}> <FilterListIcon /> </button>
                                <button className='resetPoultryButton' onClick={resetPoultry}><RestartAltIcon /></button>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-2'>
                    {
                        wholeDataLoading ? (
                            <div style={overlayStyle}>
                                <div style={{ textAlign: "center" }}>
                                    <BeatLoader
                                        loading={wholeDataLoading}
                                        cssOverride={override}
                                        size={30}
                                        color={"#f8f9fa"}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            </div>
                        ) : isTriggered && searchValues && searchValues?.length > 0 ? (
                            searchValues?.map((item, index) => (
                                <Accordion key={index} className="mt-2">
                                    <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                                        <Typography className='PoultryName'> <p className='PoultryName'> {item.poultryName} </p> </Typography>
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                            <EditIcon onClick={() => handleEdit(item)} style={{ cursor: 'pointer', color: 'blue', fontSize: '18px' }} />
                                            <DeleteIcon onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer', color: 'red', fontSize: '18px' }} data-bs-toggle="modal" data-bs-target="#myModal" />
                                            <DescriptionIcon onClick={() => handleExportExcel(item)} style={{ cursor: 'pointer', color: 'green', fontSize: '18px' }} />
                                            <VisibilityIcon onClick={() => handleView(item)} style={{ cursor: 'pointer', color: 'blue', fontSize: '18px' }} />
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <form>
                                                <table className="table table-hover mt-3">
                                                    <thead>
                                                        <tr className="table-secondary">
                                                            <th>S.No</th>
                                                            <th>Breed Name</th>
                                                            <th>Total Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {item.breedList?.map((breedItem, breedIndex) => (
                                                            <tr key={breedIndex}>
                                                                <td>{breedIndex + 1}</td>
                                                                <td>{breedItem.breedName}</td>
                                                                <td>{breedItem.totalCount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </form>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : !isTriggered && wholeData && wholeData?.length > 0 ? (
                            wholeData?.map((item, index) => (
                                <Accordion key={index} className=" mt-2">
                                    <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                                        <Typography> <p > <Link className='PoultryName'>{item.poultryName} </Link> </p> </Typography>
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                            <EditIcon onClick={() => handleEdit(item)} style={{ cursor: 'pointer', color: 'blue', fontSize: '18px' }} />
                                            <DeleteIcon onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer', color: 'red', fontSize: '18px' }} data-bs-toggle="modal" data-bs-target="#myModal" />
                                            <DescriptionIcon onClick={() => handleExportExcel(item)} style={{ cursor: 'pointer', color: 'green', fontSize: '18px' }} />
                                            <VisibilityIcon onClick={() => handleView(item)} style={{ cursor: 'pointer', color: 'blue', fontSize: '18px' }} />
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <form>
                                                <table className="table table-hover mt-3">
                                                    <thead>
                                                        <tr className="table-secondary">
                                                            <th>S.No</th>
                                                            <th>Breed Name</th>
                                                            <th>Total Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {item.breedList?.map((breedItem, breedIndex) => (
                                                            <tr key={breedIndex}>
                                                                <td>{breedIndex + 1}</td>
                                                                <td>{breedItem.breedName}</td>
                                                                <td>{breedItem.totalCount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </form>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <div className='mt-5 ' style={{ textAlign: 'center', }}>
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <p>No Data Found</p>
                            </div>
                        )
                    }

                </div>
            </div>

            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header py-2">
                            <h6 className="modal-title">Delete Poultry Dove</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ fontSize: '10px', fontWeight: '500' }}></button>
                        </div>

                        <div className="modal-body py-2">
                            <p> Are you sure want to delete ? </p>
                        </div>


                        <div className="modal-footer py-2">

                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={closeDltModal}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={okDltModal}>ok</button>
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

export default PoultryBreed;
