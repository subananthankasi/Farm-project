import React, { useState, useEffect } from 'react';
import './NewPoultryBreed.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { toast, Bounce } from "react-toastify";
import { poultryBreedPoultryGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedPoultryGet';
import { useDispatch, useSelector } from 'react-redux';
import { poultryBreedPoultryIdGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedGetId';
import { poultryBreed_BreedGetThunk } from '../../Redux/Thunk/PoultryBreed/BreedGetThunk';
import { poultryBreedCreateThunk } from '../../Redux/Thunk/PoultryBreed/CreatePoultryBreedThunk';
import { poultryBreedUpdateThunk, poultryBreedUpdateThunkData } from '../../Redux/Thunk/PoultryBreed/UpdatePoultryBreedThunk';
import { poultryBreedPageGetThunk } from '../../Redux/Thunk/PoultryBreed/PoultryBreedGet';
import Select from 'react-select';

const NewPoultryBreed = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedPoultryId, setSelectedPoultryId] = useState(null)
  const [breedData, setBreedData] = useState([])
  const [updatePayloadData, setUpdatePayloadData] = useState(null);
  const [isTriggered, setIsTriggered] = useState(false)
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

        if (isUpdate) {
          if (updatePayloadData) {

            const payload = {
              id: updatePayloadData.id,
              poultryId: values.poultryId,
              poultryBreed: values.poultryBreed,
              status: 'ACTIVE'
            };


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
            //   dispatch(poultryBreedUpdateThunkData(payload)).then(()=>{
            //     dispatch(poultryBreedPageGetThunk())
            //     toast.success("PoultryBreed  Updated successfully", {
            //       position: "top-right",
            //       autoClose: 2000,
            //       hideProgressBar: true,
            //       closeOnClick: true,
            //       pauseOnHover: true,
            //       draggable: true,
            //       progress: undefined,
            //       theme: "colored",
            //       transition: Bounce,
            //   });
            //  })

            //   navigate('/poultryBreed')

            // console.log('Updating the data:', payload);
          } else {
            console.error('fetchedData is not available');
          }

        } else {
          //create
          try {
            const response = await dispatch(poultryBreedCreateThunk(values))
            if (poultryBreedCreateThunk.fulfilled.match(response)) {
              formik.resetForm()
              dispatch(poultryBreedPageGetThunk())
              toast.success('PoultryBreed created successfully', {
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

            }
            else if (poultryBreedCreateThunk.rejected.match(response)) {
              // const createError = response.payload
              // console.log('createError  :', createError)

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

          }
          catch (error) {
            console.log('create API Error', error)
          }
          //   dispatch(poultryBreedCreateThunk(values)).then(()=>{
          //     dispatch(poultryBreedPageGetThunk())
          //     toast.success("PoultryBreed  Created successfully", {
          //       position: "top-right",
          //       autoClose: 2000,
          //       hideProgressBar: true,
          //       closeOnClick: true,
          //       pauseOnHover: true,
          //       draggable: true,
          //       progress: undefined,
          //       theme: "colored",
          //       transition: Bounce,
          //   });
          //   })


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

    const updatedpoultryBreed = formik.values.poultryBreed.filter((_, i) => i !== index);
    formik.setValues({ ...formik.values, poultryBreed: updatedpoultryBreed });

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

  useEffect(() => {
    dispatch(poultryBreedPoultryGetThunk())
    dispatch(poultryBreed_BreedGetThunk())
  }, [])

  const poultryData = useSelector((state) => state.poultryBreedPoultryGet?.data?.data)
  const breedGetData = useSelector((state) => state.poultryBreedPoultryGetData?.data?.data)
  // console.log('breedGetData',breedGetData)


  const handlePoultryChange = (e) => {
    const selectId = e.target.value;
    setSelectedPoultryId(selectId);
    // console.log('id', selectedPoultryId)
    formik.handleChange(e);
    setIsTriggered(true)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPoultryId) {
          // console.log('selectedPoultryId', selectedPoultryId);
          const response = await dispatch(poultryBreedPoultryIdGetThunk(selectedPoultryId));

          if (poultryBreedPoultryIdGetThunk.fulfilled.match(response)) {
            const fetchedData = response.payload.data;
            setBreedData(fetchedData);

            if (fetchedData.breedList.length > 0) {
              setIsUpdate(true); //Update
              setUpdatePayloadData(fetchedData);  //set a update value going to updatePayload data

            } else {
              setIsUpdate(false); //create
            }

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






  const options = poultryData?.map((item) => ({
    value: item.id,
    label: item.poultryName,
  }));




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
              <li className='breadcrumb-item'> <Link to={'/poultryBreed'} style={{ textDecoration: 'none' }} >POULTRY</Link> </li>
              <li className='breadcrumb-item active'> CREATE POULTRY</li>
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
                    {/* <Select
                      
                      options={options}
                      onChange={handlePoultryChange}
                      onBlur={() => formik.handleBlur({ target: { name: 'poultryId' } })}
                      value={options?.find((option) => option.value === formik.values.poultryId)}
                      placeholder="Select Poultry..."
                      styles={{
                        control: (base) => ({
                          ...base,
                          fontSize: '12px',      
                          minHeight: '28px',          
                          padding: '0px',  
                          width:'250px'           
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: '0px 8px',
                          fontSize:'12px'         
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          height: '28px',     
                          display:'none'       
                        }),
                      }}
                      isSearchable
                    /> */}
                    {formik.errors.poultryId && formik.touched.poultryId ? (<p style={{ color: 'red', fontSize: '12px' }}>{formik.errors.poultryId} </p>) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {
            isTriggered && (
              <div className="row mt-3" style={{ height: '100%' }}>
                <div className="col">
                  <div className="card p-2 newPoultryTable">
                    <form onSubmit={formik.handleSubmit}>
                      <table className='table  p-2'>
                        <thead>
                          <tr>
                            <th> S.No</th>
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
                                      onClick={() => handleRemoveRow(index)}
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
                            <button className='plusPounltryButton' type='button' onClick={handleAddRow} ><i className="fa-solid fa-circle-plus" style={{ color: 'blue', fontSize: '12px' }}></i> Add</button>
                          </div>
                        </div>
                      </table>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-md-12 d-flex justify-content-end">
                          {/* <button className="btn btn-primary btn-sm m-2" type='submit'> </button> */}
                          {isUpdate ? (
                            <button className="btn btn-primary btn-sm m-2" type='submit'>
                              Update
                            </button>
                          ) : (
                            <button className="btn btn-primary btn-sm m-2" type='submit'>
                              Submit
                            </button>

                          )}
                        </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            )
          }



        </div>
      </div>
    </>
  );
};

export default NewPoultryBreed;
