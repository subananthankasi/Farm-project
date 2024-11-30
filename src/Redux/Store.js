import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./Slice/LoginSlice";
import { productionGetReducer } from "./Slice/Production/ProductionGetSlice";
import { productionPoultryGetReducer } from "./Slice/Production/ProductionPoultryGet";
import { productionBreedGetReducer } from "./Slice/Production/ProductionBreedGet";
import { productionCategoryGetReducer } from "./Slice/Production/CategoryGetSlice";
import { productionCreateReducer } from "./Slice/Production/ProductionCreateSlice";
import { productionDeleteReducer } from "./Slice/Production/DeleteSlice";
import { productionUpdateGetReducer } from "./Slice/Production/UpdateGetSlice";
import { productionUpdateBreedGetReducer } from "./Slice/Production/UpdateBreedGetSlice";
import { productionUpdateReducer } from "./Slice/Production/UpdateSlice";
import { countryDeleteReducer } from "./Slice/OthersSlice/Country/CountryDltSlice";
import { countryFetchReducer } from "./Slice/OthersSlice/Country/FetchCountrySlice";
import { stateCreateGetReducer } from "./Slice/OthersSlice/State/StateCreateGetSlice";
import { stateCreateReducer } from "./Slice/OthersSlice/State/CreateSlice";
import { deleteStateReducer } from "./Slice/OthersSlice/State/DeleteSlice";
import { fetchStateReducer } from "./Slice/OthersSlice/State/FetchStateThunk";
import { updateStateReducer } from "./Slice/OthersSlice/State/UpdateStateSlice";
import { countryUpdateReducer } from "./Slice/OthersSlice/Country/UpdateCountrySlice";
import { districtGetReducer } from "./Slice/OthersSlice/District/DistrictGet";
import { createDistrictGetCountryReducer } from "./Slice/OthersSlice/District/CreateCountryGetSlice";
import { districtStateGetReducer } from "./Slice/OthersSlice/District/DistrictStateGet";
import { districtCreateReducer } from "./Slice/OthersSlice/District/DistrictCreate";
import { deleteDistrictReducer } from "./Slice/OthersSlice/District/DeleteDistrict";
import { fetchDistrictStateReducer } from "./Slice/OthersSlice/District/FetchDistrictState";
import { fetchDistrictReducer } from "./Slice/OthersSlice/District/FetchDistrict";
import { districtUpdateReducer } from "./Slice/OthersSlice/District/UpdateDistrict";
import { manageGetReducer } from "./Slice/Manage Expense/ManageGet";
import { managePoultryGetReducer } from "./Slice/Manage Expense/ManagePoultryGet";
import { manageExpenseGetReducer } from "./Slice/Manage Expense/ManageExpenseGet";
import { countryGetReducer } from "./Slice/OthersSlice/Country/CountrySlice";
import { countryCreateReducer } from "./Slice/OthersSlice/Country/CountryCreateSlice";
import { StateGetReducer } from "./Slice/OthersSlice/State/StateGetSlice";
import { BreedTypeCreate } from "./Slice/MasterSlice/Breedtype/BreedTypePostSlice";
import { GetReducer } from "./Slice/MasterSlice/Breedtype/BreedtypeGetSlice";
import { BTDeleteReducer } from "./Slice/MasterSlice/Breedtype/BreedtypeDeleteSlice";
import { BTUpdateReducer } from "./Slice/MasterSlice/Breedtype/BreedtypeUpdateSlice";
import { BTfetchGetReducer } from "./Slice/MasterSlice/Breedtype/BreedtypegetFetchSlice";
import { CatePostReducer } from "./Slice/MasterSlice/CategorySlice/CategoryPostSlice";
import { CategoryGetReducer } from "./Slice/MasterSlice/CategorySlice/CategoryGetSlice";
import { CategoryDeleteReducer } from "./Slice/MasterSlice/CategorySlice/CategoryDeleteSlice";
import { CategoryFetchReducer } from "./Slice/MasterSlice/CategorySlice/CategoryFetchSlice";
import { CategoryUpdateReducer } from "./Slice/MasterSlice/CategorySlice/CategoryUpdateSlice";
import { ExpenCreateReducer } from "./Slice/MasterSlice/Expenses Head/ExpenPostSlice";
import { ExpenGetReducer } from "./Slice/MasterSlice/Expenses Head/ExpenGetSlice";
import { ExpenDeleteReducer } from "./Slice/MasterSlice/Expenses Head/ExpenDeleteSlice";
import { ExpenFetchReducer } from "./Slice/MasterSlice/Expenses Head/ExpenFetchSlice";
import { ExpenUpdateReducer } from "./Slice/MasterSlice/Expenses Head/ExpenUpdateSlice";
import { BreedCreateReducer } from "./Slice/MasterSlice/Breed/BreedPostSlice";
import { BreedgetReducer } from "./Slice/MasterSlice/Breed/BreedGetSlice";
import { BreedDeleteReducer } from "./Slice/MasterSlice/Breed/BreedDeleteSlice";
import { BreedUpdateReducer } from "./Slice/MasterSlice/Breed/BreedUpdateSlice";
import { BreedfetchReducer } from "./Slice/MasterSlice/Breed/BreedFetchSlice";
import { BreedtypegetReducer } from "./Slice/MasterSlice/Breed/BreedTypeSlice";
import { PoultryCreateReducer } from "./Slice/MasterSlice/Poultry/PoultryPostSlice";
import { PoultryGetReducer } from "./Slice/MasterSlice/Poultry/PoultryGetSlice";
import { PoultryDeleteReducer } from "./Slice/MasterSlice/Poultry/PoultryDeleteSlice";
import { PoultryFetchReducer } from "./Slice/MasterSlice/Poultry/PoultryFetchSlice";
import { PoultryUpdateReducer } from "./Slice/MasterSlice/Poultry/PoultryUpdateSlice";
import { PoultrycountryReducer } from "./Slice/MasterSlice/Poultry/PoultryCountrySlice";
import { PoultryStateReducer } from "./Slice/MasterSlice/Poultry/PoultryStateSlice";
import { PoultrycountryGetReducer } from "./Slice/MasterSlice/Poultry/PoultryCountrygetSlice";
import { ProductCreateReducer } from "./Slice/MasterSlice/ProductSlice/ProductPostSlice";
import { ProductGetReducer } from "./Slice/MasterSlice/ProductSlice/ProductGetSlice";
import { ProductDeleteReducer } from "./Slice/MasterSlice/ProductSlice/ProductDeleteSlice";
import { ProductFetchReducer } from "./Slice/MasterSlice/ProductSlice/ProductFetchSlice";
import { ProductUpdateReducer } from "./Slice/MasterSlice/ProductSlice/ProductUpdateSlice";
import { manageCreateReducer } from "./Slice/Manage Expense/Create";
import { manageDeleteReducer } from "./Slice/Manage Expense/Delete";
import { manageUpdateReducer } from "./Slice/Manage Expense/Update";
import { manageFetchReducer } from "./Slice/Manage Expense/Fetch";
import { manageSearchReducer } from "./Slice/Manage Expense/SearchManage";
import { manageWordReducer } from "./Slice/Manage Expense/WordDownload";
import { manageXlReducer } from "./Slice/Manage Expense/XLdownload";
import { transactionGetReducer } from "./Slice/Transaction/TransactionGet";
import { transPoultryReducer } from "./Slice/Transaction/PoultryGet";
import { transactionSearchReducer } from "./Slice/Transaction/Search";
import { salesGetReducer } from "./Slice/SalesSlice/SalesGet";
import { salesPoultryGetReducer } from "./Slice/SalesSlice/PoultryGet";
import { salesCustomerGetReducer } from "./Slice/SalesSlice/CustomerGet";
import { salesProductGetReducer } from "./Slice/SalesSlice/ProductGet";
import { salesCreateReducer } from "./Slice/SalesSlice/CreateSales";
import { salesDeleteReducer } from "./Slice/SalesSlice/DeleteSalesSlice";
import { salesFetchReducer } from "./Slice/SalesSlice/FetchSalesSLice";
import { salesFetchProductReducer } from "./Slice/SalesSlice/FetchProductSalesSlice";
import { salesUpdateReducer } from "./Slice/SalesSlice/UpdateSalesSlice";
import { salesXlReducer } from "./Slice/SalesSlice/XLsalesSlice";
import { poultryBreedGetReducer } from "./Slice/PoultryBreed/PoultryBreedGet";
import { poultrySearachReducer } from "./Slice/PoultryBreed/SearchPoultry";
import { poultryBreedPoultryGetReducer } from "./Slice/PoultryBreed/PoultryGetPoultryBreed";
import { poultryBreedPoultryGetIdReducer } from "./Slice/PoultryBreed/PoultryBreedPoultryGetIdSlice";
import { poultryBreed_BreedGetReducer } from "./Slice/PoultryBreed/BreedGet";
import { poultryBreedCreateReducer } from "./Slice/PoultryBreed/CreatePoultryBreedSlice";
import { poultryBreedUpdateReducer } from "./Slice/PoultryBreed/UpdatePoultryBreedSlice";
import { poultryBreedDeleteReducer } from "./Slice/PoultryBreed/DeletepoultryBreed";
import { poultryBreedXlReducer } from "./Slice/PoultryBreed/XlPoultryBreed";
import { fetchPoultryBreedReducer } from "./Slice/PoultryBreed/FetchPoultryBreedSlice";
import { forgotReducer } from "./Slice/ForgotSlice";
import { ProductCategoryGetReducer } from "./Slice/MasterSlice/ProductSlice/ProductCategorySlice";
import { ProductBreedGetReducer } from "./Slice/MasterSlice/ProductSlice/ProductBreedGetIdSlice";
import {customerCreateReducer} from "./Slice/MasterSlice/CustomerSlice/CustomerPostSlice";
import { customerGetReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerGetSlice";
import { customerDeleteReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerDeleteSlice";
import { customerFetchReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerFetchSlice";
import { customerUpdateReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerUpdateSlice";
import { customerCountryGetReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerCountryGetSlice";
import { customerCountryStateReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerCountryStateGetSlice";
import { customerCountryDisReducer } from "./Slice/MasterSlice/CustomerSlice/CustomerCountryDisGetSlice";
import { userPostReducer } from "./Slice/MasterSlice/UserSlice/UserPostSlice";
import { userGetReducer } from "./Slice/MasterSlice/UserSlice/UserGetSlice";
import { userDeleteReducer } from "./Slice/MasterSlice/UserSlice/UserDeleteSlice";
import { userFetchReducer } from "./Slice/MasterSlice/UserSlice/UserFetchSlice";
import { userUpdateReducer } from "./Slice/MasterSlice/UserSlice/UserUpdateSlice";
import { userRoleGetReducer } from "./Slice/MasterSlice/UserSlice/UserRoleGetSlice";
import { userProfileGetReducer } from "./Slice/MasterSlice/ProfileSlice/UserDetailGetSlice";
import { userProfileFetchReducer } from "./Slice/MasterSlice/ProfileSlice/UserGetIdSlice";
import { userProfileUpdateReducer } from "./Slice/MasterSlice/ProfileSlice/UserProfileUpdateSlice";
import { userProfilePasswordReducer } from "./Slice/MasterSlice/ProfileSlice/UserPasswordSlice";
import { poultryBreedWordReducer } from "./Slice/PoultryBreed/WordPoltyrBreed";
import { salesWordReducer } from "./Slice/SalesSlice/SalesWordSlice";
import { insideDeletePoultryReducer } from "./Slice/PoultryBreed/InsideDeletePoultryBreed";



export const store = configureStore({
  reducer: {
    BreedTypeCreates: BreedTypeCreate,
    BreedTypeGet: GetReducer,
    BreedTypeDeleted: BTDeleteReducer,
    BreedTypeUpdate: BTUpdateReducer,
    BreedTypeFetch: BTfetchGetReducer,
    CategoryPost: CatePostReducer,
    CategoryGet: CategoryGetReducer,
    CategoryDelete: CategoryDeleteReducer,
    CategoryFetch: CategoryFetchReducer,
    CategoryUpdate: CategoryUpdateReducer,
    ExpensesCteate: ExpenCreateReducer,
    ExpensesGet: ExpenGetReducer,
    ExpensesDelete: ExpenDeleteReducer,
    ExpensesFetch: ExpenFetchReducer,
    ExpensesUpdate: ExpenUpdateReducer,
    BreedPost: BreedCreateReducer,
    Breedget: BreedgetReducer,
    BreedDelete: BreedDeleteReducer,
    BreedUpdate: BreedUpdateReducer,
    BreedFetch: BreedfetchReducer,
    BreedTypeget: BreedtypegetReducer,
    PoultryPost: PoultryCreateReducer,
    PoultryGet: PoultryGetReducer,
    PoultryDelete: PoultryDeleteReducer,
    PoultryFetch: PoultryFetchReducer,
    PoultryUpdate: PoultryUpdateReducer,
    PoultryCountry: PoultrycountryReducer,
    PoultryState: PoultryStateReducer,
    PoultryCountryGet: PoultrycountryGetReducer,
    ProductPost: ProductCreateReducer,
    ProductGet: ProductGetReducer,
    ProductDelete: ProductDeleteReducer,
    ProductFetch: ProductFetchReducer,
    ProductUpdate: ProductUpdateReducer,


    loginData: loginReducer,
    forgotData : forgotReducer,
    loginData: loginReducer,

    
    BreedTypeCreates:BreedTypeCreate,
      BreedTypeGet:GetReducer,
      BreedTypeDeleted:BTDeleteReducer,
      BreedTypeUpdate:BTUpdateReducer,
      BreedTypeFetch:BTfetchGetReducer,
      CategoryPost:CatePostReducer,
      CategoryGet:CategoryGetReducer,
      CategoryDelete:CategoryDeleteReducer,
      CategoryFetch:CategoryFetchReducer,
      CategoryUpdate:CategoryUpdateReducer,
      ExpensesCteate:ExpenCreateReducer,
      ExpensesGet:ExpenGetReducer,
      ExpensesDelete:ExpenDeleteReducer,
      ExpensesFetch:ExpenFetchReducer,
      ExpensesUpdate:ExpenUpdateReducer,
      BreedPost:BreedCreateReducer,
      Breedget:BreedgetReducer,
      BreedDelete:BreedDeleteReducer,
      BreedUpdate:BreedUpdateReducer,
      BreedFetch:BreedfetchReducer,
      BreedTypeget:BreedtypegetReducer,
      PoultryPost:PoultryCreateReducer,
      PoultryGet:PoultryGetReducer,
      PoultryDelete:PoultryDeleteReducer,
      PoultryFetch:PoultryFetchReducer,
      PoultryUpdate:PoultryUpdateReducer,
      PoultryCountry:PoultrycountryReducer,
      PoultryState:PoultryStateReducer,
      PoultryCountryGet:PoultrycountryGetReducer,
      ProductPost:ProductCreateReducer,
      ProductGet:ProductGetReducer,
      ProductDelete:ProductDeleteReducer,
      ProductFetch:ProductFetchReducer,
      ProductUpdate:ProductUpdateReducer,
      ProductCategoryGet:ProductCategoryGetReducer,
      ProductBreedGet:ProductBreedGetReducer,
      customerPost:customerCreateReducer,
      customerGet:customerGetReducer,
      customerDelete:customerDeleteReducer,
      customerFetch:customerFetchReducer,
      customerUpdate:customerUpdateReducer,
      customerCountryGet:customerCountryGetReducer,
      customerCountryState:customerCountryStateReducer,
      customerCountryDis:customerCountryDisReducer,
      userPost:userPostReducer,
      userGet:userGetReducer,
      userDelete:userDeleteReducer,
      userFetch:userFetchReducer,
      userUpdate:userUpdateReducer,
      userRoleGet:userRoleGetReducer,
      profileGet:userProfileGetReducer,

      profileFetch:userProfileFetchReducer,
      profileUpdate:userProfileUpdateReducer,
      profilePasswordUpdate:userProfilePasswordReducer,



    
    //Country
    countryGetData: countryGetReducer,
    countryCreate: countryCreateReducer,
    countryDelete: countryDeleteReducer,
    countryFetchData: countryFetchReducer,
    countryUpdate: countryUpdateReducer,

    //State
    StateGetData: StateGetReducer,
    stateCreateGetData: stateCreateGetReducer,
    stateCreate: stateCreateReducer,
    stateDelete: deleteStateReducer,
    stateFetchData: fetchStateReducer,
    stateUpdate: updateStateReducer,

    //District
    districtGetData: districtGetReducer,
    districtGetCountryData: createDistrictGetCountryReducer,
    districtStateGetData: districtStateGetReducer,
    districtCreate: districtCreateReducer,
    districtDelete: deleteDistrictReducer,
    fetchDistrictState: fetchDistrictStateReducer,
    fetchDistrict: fetchDistrictReducer,
    updateDistrict: districtUpdateReducer,

    //Production
    productionGetData: productionGetReducer,
    productionPoultryGetData: productionPoultryGetReducer,
    productionBreedGetData: productionBreedGetReducer,
    productionCategoryGetData: productionCategoryGetReducer,
    productionCreate: productionCreateReducer,
    productionDelete: productionDeleteReducer,
    productionUpdateGet: productionUpdateGetReducer,
    productionUpdateBreedGet: productionUpdateBreedGetReducer,
    productionUpdate: productionUpdateReducer,

    //Manage Expense
    manageData: manageGetReducer,
    managePoultryGet: managePoultryGetReducer,
    manageExpenseGet: manageExpenseGetReducer,
    manageCreate: manageCreateReducer,
    manageDelete: manageDeleteReducer,
    manageFetch: manageFetchReducer,
    manageUpdate: manageUpdateReducer,
    manageSearch: manageSearchReducer,
    manageXl: manageXlReducer,
    manageWord: manageWordReducer,

    //Transaction
    transactionData: transactionGetReducer,
    transactionPoultry: transPoultryReducer,
    transactionSearch: transactionSearchReducer,


    //Sales
    salesGetData: salesGetReducer,
    salesPoultryGet: salesPoultryGetReducer,
    salesCustomer: salesCustomerGetReducer,
    salesProduct: salesProductGetReducer,
    salesCreate: salesCreateReducer,
    saleDelete: salesDeleteReducer,
    saleFetchData: salesFetchReducer,
    saleFetchProduct: salesFetchProductReducer,
    saleUpdate: salesUpdateReducer,
    saleXL: salesXlReducer,
    saleWord:salesWordReducer,

    //Poultry Breed
    poultryBreedGetData: poultryBreedGetReducer,
    polutrySearchData: poultrySearachReducer,
    poultryBreedPoultryGet: poultryBreedPoultryGetReducer,
    poltryBreedPoultryGetId: poultryBreedPoultryGetIdReducer,
    poultryBreedPoultryGetData: poultryBreed_BreedGetReducer,
    poultryBreedCreate: poultryBreedCreateReducer,
    poultryBreedUpdate: poultryBreedUpdateReducer,
    poultryBreedDelete: poultryBreedDeleteReducer,
    poultryBreedXL: poultryBreedXlReducer,
    poultryBreedFetch: fetchPoultryBreedReducer,
    poultryBreedWord:poultryBreedWordReducer,
    poultryBreedInsideDelete : insideDeletePoultryReducer






  }

})

