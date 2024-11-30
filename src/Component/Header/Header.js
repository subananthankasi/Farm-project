import React, { useEffect, useState } from "react";
import "./header.css";
import imglogo from "../../Assets/android-profile-icon-2.jpg";
import logolan from "../../Assets/logo-dark.png";
import { TbHome } from "react-icons/tb";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logofavi from "../../Assets/favicon.png";

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

const Header = () => {
  const loginDatas = useSelector((state) => state.loginData);
  const login = loginDatas?.data?.data;
  const form_Token = login?.jwt;
  console.log(form_Token, "form_Token");

  // console.log(auth_token)

  useEffect(() => {
    const savedToken = localStorage.getItem("form_Token");
    console.log(savedToken);

    if (!savedToken) {
      window.location.href = "/";
    }
  }, [form_Token]);

  const handleLogout = () => {
    localStorage.removeItem("form_Token");
    window.location.href = "/";
  };
  // const style = {
  //   position: 'absolute' ,
  //   top: '20%',
  //   left: '90%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 200,
  //   bgcolor: 'background.paper',
  //   // border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };
  // const [open, setOpen] = useState(false);
  // const headermodal = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <>
      <div className=" header-farm py-1">
        {/* <div className=""> */}
        <div className="logolans mx-3 d-flex flex-row">
          <img
            src={logolan}
            className="mt-3 logoland"
            style={{ width: "120px", height: "30px" }}
          />
          
          <img
           src={logofavi}
            className="mt-3 logo_Favi"
            style={{ width: "30px", height: "30px" }}
          />
        
          
        </div>
        {/* <div className="logo_Favi" style={{paddingLeft:"50px"}}>
            <img
                src={logofavi}
                className="mt-3 logo_Favi"
                style={{ width: "30px", height: "30px" }}
              />
        </div> */}
        {/* </div> */}

        <div className="d-flex header-body p-0 ">
          <div>
            <img
              src={imglogo}
              data-bs-toggle="dropdown"
              className="header-img mt-2 mx-1"
              style={{cursor:"pointer"}}
            />
            <div className="dropdown me-5">
              <ul className="dropdown-menu ">
                <li>
                  <a className="dropdown-item p-4" href="#">
                    <img
                      src={imglogo}
                      className=" "
                      style={{ width: "45px", height: "45px" }}
                    />
                    <span className="mx-2">Admin</span>
                  </a>
                </li>
                <li>
                <Link to="/dashboard" style={{textDecoration:"none"}}>

                  <a className="dropdown-item" href="#">
                    <TbHome
                      size={18}
                      // color="#343a40"
                      className="mx-2 profile_icon"
                    />
                    <span className="profile_admin">Home</span>
                  </a>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-decoration-none">
                    <a className="dropdown-item text-decoration-none  " href="#">
                      <RiUser3Line
                        size={18}
                        // color="#343a40"
                        className="mx-2 profile_icon"
                      />
                      <span className="profile_admin">Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    <HiOutlineLogout
                      size={18}
                      // color="#343a40"
                      className="mx-2 profile_icon"
                    />
                    <span className="profile_admin" onClick={handleLogout}>
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="px- Logout">
            <button
              className="btn btn-primary me-3 mt-2 "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* <div>
      <Button onClick={headermodal}></Button>
      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div> */}
    </>
  );
};

export default Header;
