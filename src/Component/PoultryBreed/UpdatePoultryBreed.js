import React, { useState, useEffect } from 'react';
import './NewPoultryBreed.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { toast, ToastContainer, Bounce } from "react-toastify";
import { poultryBreedPoultryGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedPoultryGet';
import { useDispatch, useSelector } from 'react-redux';
import { poultryBreedPoultryIdGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedGetId';
import { poultryBreed_BreedGetThunk } from '../../Redux/Thunk/PoultryBreed/BreedGetThunk';
import { poultryBreedCreateThunk } from '../../Redux/Thunk/PoultryBreed/CreatePoultryBreedThunk';
import { poultryBreedUpdateThunkData } from '../../Redux/Thunk/PoultryBreed/UpdatePoultryBreedThunk';
import { poultryBreedFetchThunk } from '../../Redux/Thunk/PoultryBreed/FetchPoultryBreed';
import { poultryBreedPageGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedGet';
import { insideDeletePoultryThunk } from '../../Redux/Thunk/PoultryBreed/InsideDeletePoultryThunk';


const UpdatePoultryBreed = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [selectedPoultryId, setSelectedPoultryId] = useState(null)
  const [breedData, setBreedData] = useState([])
  //   const [isTriggered, setIsTriggered] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false);
  const [poultryBreed, setPoultryBreed] = useState([
    {
      breedId: '',
      id: null,
      poultryBreedMappingId: null,
      totalCount: '',
      status: 'ACTIVE',
    }
  ]);


  const initialValues = {
    poultryBreed,
    id: null,
    poultryId: '',
    status: 'ACTIVE'
  }
  const validationSchema = yup.object().shape({
    poultryId: yup.string().required("*required!!"),
    poultryBreed: yup.array().of(
      yup.object().shape({
        breedId: yup.string().required("*required!!"),
        totalCount: yup.string().required("*required!!"),

      })
    )
  })



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {

        const payload = {
          id: values.id,
          poultryId: values.poultryId,
          status: 'ACTIVE',
          poultryBreed: values.poultryBreed
        }
        try {
          const response = await dispatch(poultryBreedUpdateThunkData(payload))
          if (poultryBreedUpdateThunkData.fulfilled.match(response)) {
            const message = response.payload.data;
            // console.log('message', message)


            formik.resetForm();
            dispatch(poultryBreedPageGetThunk());

            toast.success('PoultryBreed updated successfully', {
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
            navigate('/poultryBreed')


          } else if (poultryBreedUpdateThunkData.rejected.match(response)) {
            // const errorPayload = response.payload.reason
            // console.log('dispatch errorPayload :', errorPayload)

            toast.error('Invalid values', {
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
        console.log("Form validation errors", errors);
      }

    }

  })


  const handleAddRow = (e) => {
    e.preventDefault();
    formik.setValues({
      ...formik.values,
      poultryBreed: [...formik.values.poultryBreed, { breedId: '', totalCount: '', id: null, poultryBreedMappingId: null, status: 'ACTIVE' }]
    });
  };

  // const handleRemoveRow = (id) => {
  //   console.log("index",id)
  //   dispatch(insideDeletePoultryThunk(id))
  //   toast.success("deleted successfully", {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //     transition: Bounce,
  //   });
  // };
  const handleRemoveRow = (id,index) => {
    if (index === 0) {
      toast.error("Cannot be Deleted.", {
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
    // console.log("id", id);
    dispatch(insideDeletePoultryThunk(id))
      .then(() => {
        const updatedRows = formik.values.poultryBreed.filter((row) => row.id !== id);
        formik.setFieldValue("poultryBreed", updatedRows);
  
        toast.success("Deleted successfully", {
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
      .catch((error) => {
        toast.error("Failed to delete. Please try again.", {
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
        console.error("Deletion failed", error);
      });
  };
  
  const EditValue = location.state?.poultry
  //   console.log('EditValue',EditValue)
  useEffect(() => {
 
    dispatch(poultryBreedFetchThunk(EditValue))
    dispatch(poultryBreedPoultryGetThunk())
    dispatch(poultryBreed_BreedGetThunk())
  }, [])

  const poultryData = useSelector((state) => state.poultryBreedPoultryGet?.data?.data)
  const breedGetData = useSelector((state) => state.poultryBreedPoultryGetData?.data?.data)
  const fetchData = useSelector((state) => state.poultryBreedFetch?.data?.data)

  console.log('fetchData', fetchData)

  useEffect(() => {
    if (fetchData) {
      formik.resetForm();
      formik.setFieldValue('poultryId', fetchData?.poultryId || '');
      formik.setFieldValue('id', fetchData?.id || '');

      if (fetchData.breedList && fetchData.breedList.length > 0) {
        fetchData.breedList.forEach((breed, index) => {
          formik.setFieldValue(`poultryBreed[${index}].breedId`, breed.breedId || '')
          formik.setFieldValue(`poultryBreed[${index}].totalCount`, breed.totalCount || '')
          formik.setFieldValue(`poultryBreed[${index}].id`, breed.id || '')
          formik.setFieldValue(`poultryBreed[${index}].poultryBreedMappingId`, breed.poultryBreedMappingId || '')
          formik.setFieldValue(`poultryBreed[${index}].status`, 'ACTIVE' || '')

        })
      }

    }
  }, [fetchData])

  const handlePoultryChange = (e) => {
    const selectId = e.target.value;
    setSelectedPoultryId(selectId);

    formik.handleChange(e);
    // setIsTriggered(true)
  }
  const clearUpdateValues = () => {
    console.log("clearForm")
    formik.resetForm();
    formik.setFieldValue('poultryId', '');
    formik.setFieldValue('id', '');
    formik.setFieldValue('poultryBreed', []);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPoultryId) {

          const response = await dispatch(poultryBreedPoultryIdGetThunk(selectedPoultryId));

          if (poultryBreedPoultryIdGetThunk.fulfilled.match(response)) {
            const fetchedData = response.payload.data;
            setBreedData(fetchedData);
            const updatedpoultryBreed = fetchedData.breedList.length > 0
              ? fetchedData.breedList.map(breed => ({
                breedId: breed.breedId || '',
                totalCount: breed.totalCount || '',
                id: breed.id,
                poultryBreedMappingId: breed.poultryBreedMappingId,
                status: 'ACTIVE',
              }))
              : [{ breedId: '', totalCount: '', id: null, poultryBreedMappingId: null, status: 'ACTIVE' }];

            formik.setFieldValue('poultryBreed', updatedpoultryBreed);
          } else {
            console.error('Failed to fetch breed data', response.error.message);
          }
        }
      } catch (error) {
        console.log('Error fetching breed data:', error);
      }
    };

    if (selectedPoultryId) {
      fetchData();
    }
  }, [selectedPoultryId, dispatch]);

  return (
    <>
      <div className=' container-fluid puoltryBreedNewContainer'>
        <div className='row'>
          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <h5>Poultry Breed</h5>
          </div>
          <nav className='col-12 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-sm-end justify-content-start'>
            <ol className='breadcrumb  '>
              <li className='breadcrumb-item'> <Link to={'/dashboard'} style={{ textDecoration: 'none' }} >HOME</Link>  </li>
              <li className='breadcrumb-item'>
                <Link to={'/poultryBreed'} style={{ textDecoration: 'none' }} onClick={clearUpdateValues}>
                  POULTRY
                </Link>
              </li>
              {/* <li className='breadcrumb-item'> <Link to={'/poultryBreed'} style={{ textDecoration: 'none' }} onClick={clearUpdateValues} >POULTRY</Link> </li> */}
              <li className='breadcrumb-item active'> UPDATE POULTRY </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body d-flex justify-content-center" >
                  <div className="form-group" >
                    <label htmlFor="poultry" >Poultry <span style={{ color: 'red' }}>*</span></label>
                    <select name="poultryId" id="poultry" className='form-control' style={{ width: '250px', fontSize: '12px' }} onChange={handlePoultryChange} onBlur={formik.handleBlur} value={formik.values.poultryId} >
                      <option value="">Select Poultry...</option>
                      {
                        poultryData?.map((item) => (
                          <option key={item.id} value={item.id} >{item.poultryName} </option>
                        ))
                      }
                    </select>
                    {formik.errors.poultryId && formik.touched.poultryId ? (<p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.poultryId} </p>) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="row mt-3" style={{ height: '100%' }}>
            <div className="col">
              <div className="card p-2 newPoultryTable">
                <form onSubmit={formik.handleSubmit}>
                  <table className='table  p-2'>
                    <thead>
                      <tr>
                        <th> S.NO</th>
                        <th> Breed Name</th>
                        <th> Total Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        formik.values.poultryBreed.map((row, index) => (
                          <tr key={index}>
                            <td className='col'>{index + 1}</td>
                            <td className='col'>
                              <select
                                type='text'
                                name={`poultryBreed[${index}].breedId`}
                                className='form-control'
                                style={{ fontSize: '12px' }}
                                value={formik.values.poultryBreed[index].breedId}
                                // onChange={formik.handleChange}
                                onChange={(e) => {
                                  const selectedBreedId = e.target.value;

                                  const duplicateIndex = formik.values.poultryBreed.findIndex(
                                    (breed, idx) => breed.breedId === selectedBreedId && idx !== index
                                  );

                                  if (duplicateIndex !== -1) {
                                    // If duplicate is found, clear the current input
                                    formik.setFieldValue(`poultryBreed[${index}].breedId`, '');
                                    formik.setFieldValue(`poultryBreed[${index}].totalCount`, '');

                                    // Optionally, you can clear errors for the fields if needed
                                    formik.setFieldTouched(`poultryBreed[${index}].breedId`, false);
                                    formik.setFieldTouched(`poultryBreed[${index}].totalCount`, false);

                                    alert('This Breed is already selected! Please choose another.');
                                  } else {
                                    // Otherwise, set the selected value
                                    formik.handleChange(e);
                                  }
                                }}
                                onBlur={formik.handleBlur}
                              >
                                <option> Select BreedName... </option>
                                {
                                  breedGetData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.breedName} </option>
                                  ))
                                }

                              </select>
                              {formik.errors.poultryBreed?.[index]?.breedId && formik.touched.poultryBreed?.[index]?.breedId ? (
                                <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.poultryBreed[index].breedId}</p>
                              ) : null}
                            </td>
                            <td className='d-flex gap-3 me-auto align-items-start col'>
                              <div className='d-flex flex-column' style={{ width: '100%' }}>
                                <input
                                  type='number'
                                  style={{ width: '100%', fontSize: '12px' }}
                                  name={`poultryBreed[${index}].totalCount`}
                                  className='form-control'
                                  placeholder='00'
                                  value={formik.values.poultryBreed[index].totalCount}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.errors.poultryBreed?.[index]?.totalCount && formik.touched.poultryBreed?.[index]?.totalCount ? (
                                  <p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.poultryBreed[index].totalCount}</p>
                                ) : null}
                              </div>
                              <span>
                                <button
                                  className='deleteIcon'
                                  type='button'
                                  onClick={() => handleRemoveRow(row.id,index)}
                                // disabled={index === 0}
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                </button>
                              </span>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <div className='row'>
                      <div className='col'>
                        <button className='plusPounltryButton' type='button' onClick={handleAddRow} ><i className="fa-solid fa-circle-plus" style={{ color: 'blue' }}></i> Add</button>
                      </div>
                    </div>
                  </table>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-md-12 d-flex justify-content-end">
                      <button className="btn btn-primary btn-sm m-2" type='submit'>Update </button>
                      {/* {isUpdate ? (
                            <button className="btn btn-primary btn-sm m-2" type='submit'>
                              Update
                            </button>
                          ) : (
                            <button className="btn btn-primary btn-sm m-2" type='submit'>
                              Submit
                            </button>
                          )} */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePoultryBreed;
