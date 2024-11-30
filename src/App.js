
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Country from './Component/Masters/Others/Country';
import State from './Component/Masters/Others/State';
import District from './Component/Masters/Others/District';
import Production from './Component/Production/Production';
import ManageExpense from './Component/ManageExpenses/ManageExpense';
import Dashboard from './Component/Dashboard/Dashboard';
import Transaction from './Component/Transaction/Transaction';
import Sales from './Component/Sales/Sales';
import NewSales from './Component/Sales/NewSales';
import PoultryBrred from './Component/PoultryBreed/PoultryBrred';
import NewPoultryBreed from './Component/PoultryBreed/NewPoultryBreed';
import Customer from './Component/Masters/Customer';
import SideNavBar from './SideNavBarMenu/SideNavBar';
import User from './Component/Masters/User';
import Poultry from './Component/Masters/Poultry';
import BreedTYpe from './Component/Masters/BreedTYpe';
import Breed from './Component/Masters/Breed';
import Category from './Component/Masters/Category';
import Product from './Component/Masters/Product';
import ExpensesHead from './Component/Masters/ExpensesHead';
import CustomerEdit from './Component/Masters/CustomerEdit';
import CustomerUpdate from './Component/Masters/CustomerUpdate';
import UserUpdate from './Component/Masters/UserUpdate';
import UserEdit from './Component/Masters/UserEdit';
import Profile from './Component/Header/Profile/Profile';
import ForgetPassword from './Login/ForgetPassword';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import UpdateSale from './Component/Sales/UpdateSale';
import UpdatePoultryBreed from './Component/PoultryBreed/UpdatePoultryBreed';
import AnotherPageNotFound from './AnotherPageNotFound/AnotherPageNotFound';






function Layout() {
  return (
    <SideNavBar>
      <Outlet/>
    </SideNavBar>
    
  );
}


function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
     <Route path='/' element = {<Login/>} /> 
    <Route path='/forgetPassword' element = {<ForgetPassword/>}  />
    <Route  element={<Layout/>}>
    <Route path='/country' element = {<Country/>}/>
    <Route path='/state' element = {<State/>}/>
    <Route path='/district' element = {<District/>}/>
    <Route path='/production' element = {<Production/>}/>
    <Route path='/manageExpense' element = {<ManageExpense/>}/>
    <Route path='/transaction' element={<Transaction/>} />
    <Route path='/sales' element={<Sales/>} />
    <Route path='/newSales' element= {<NewSales/>} />
    <Route path='/updateSale' element= {<UpdateSale/>} />
    <Route path='/poultryBreed' element ={<PoultryBrred/>} />
    <Route path='/newPoultryBreed' element ={<NewPoultryBreed/>} />
    <Route path='/updatePoultryBreed' element ={<UpdatePoultryBreed/>} />
    <Route path='/customer' element = {<Customer/>}/>
    <Route path='/customeredit' element = {<CustomerEdit/>}/>
    {/* <Route path='/customerupdate' element = {<CustomerUpdate/>}/> */}
    <Route path="/customerUpdate" element={<CustomerUpdate />} />
    <Route path='/user' element = {<User/>}/>
    <Route path='/userupdate' element = {<UserUpdate/>}/>
    <Route path='/useredit' element = {<UserEdit/>}/>
    <Route path='/poultry' element = {<Poultry/>}/>
    <Route path='/breedtype' element = {<BreedTYpe/>}/>
    <Route path='/breed' element = {<Breed/>}/>
    <Route path='/category' element = {<Category/>}/>
    <Route path='/product' element = {<Product/>}/>
    <Route path='/expenses' element = {<ExpensesHead/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='*' element={<AnotherPageNotFound/>} />
    <Route path='/dashboard' element={<Dashboard />} />


  



   

    </Route>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
