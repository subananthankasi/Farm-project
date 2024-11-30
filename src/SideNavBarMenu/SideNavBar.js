import React, { useState } from "react";
import "./sideNavBar.css";
import { Link } from "react-router-dom";
import logos from "../../src/Assets/favicon.png";
import { TbHome, TbFileInfo, TbLetterCSmall } from "react-icons/tb";
import { LiaTwitter } from "react-icons/lia";
import { LuWarehouse } from "react-icons/lu";
import { BiLogoProductHunt } from "react-icons/bi";
import { FaMoneyBillTransfer, FaScaleBalanced, FaPeopleRoof, FaUsers, 
  FaUser, FaChartLine, FaCheck, FaEarthAmericas, FaCity, FaChartArea } from "react-icons/fa6";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

const SideNavBar = ({ children, activeDashboard }) => {
    const [activeNav, setActiveNav] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState(null);
  console.log(activeNav,activeSubNav,activeSubNavItem)
  // const [isMastersOpen, setIsMastersOpen] = useState(false); // To keep track if 
  
  const sideNavBarData = [
    {
      title: "Dashboard",
      icon: <TbHome size={18} color={activeNav === 0 ? "#fff" : "grey"} />,
      link: "/dashboard",
    },
    {
      title: "Masters",
      icon: <TbFileInfo size={18} color={activeNav === 1 ? "#fff" : "grey"} />,
      SubNav: [
        {
          title: "Customers",
          icon: <FaUsers size={14} color={activeSubNav === 0 ? "#fff" : "grey"} />,
          link: "/customer",
        },
        {
          title: "Users",
          icon: <FaUser size={12} color={activeSubNav === 1 ? "#fff" : "grey"} />,
          link: "/user",
        },
        {
          title: "Poultry",
          icon: <LiaTwitter size={18} color={activeSubNav === 2 ? "#fff" : "grey"} />,
          link: "/poultry",
        },
        {
          title: "Breed Types",
          icon: <LiaTwitter size={18} color={activeSubNav === 3 ? "#fff" : "grey"} />,
          link: "/breedtype",
        },
        {
          title: "Breed",
          icon: <LiaTwitter size={18} color={activeSubNav === 4 ? "#fff" : "grey"} />,
          link: "/breed",
        },
        {
          title: <span className="title-cate">Category</span>,
          icon: <TbLetterCSmall size={30} color={activeSubNav === 5 ? "#fff" : "grey"} className="icon-cate" />,
          link: "/category",
        },
        {
          title: "Products",
          icon: <BiLogoProductHunt size={18} color={activeSubNav === 6 ? "#fff" : "grey"} />,
          link: "/product",
        },
        {
          title: "Expenses Head",
          icon: <FaChartLine size={10} color={activeSubNav === 7 ? "#fff" : "grey"} />,
          link: "/expenses",
        },
        {
          title: "Others",
          icon: <FaCheck size={12} color={activeSubNav === 8 ? "#fff" : "grey"} />,
          SubNav_Item: [
            {
              title: "Country",
              icon: <FaEarthAmericas size={10} color={activeSubNavItem === 0 ? "#fff" : "grey"} />,
              link: "/country",
            },
            {
              title: "State",
              icon: <FaCity size={10} color={activeSubNavItem === 1 ? "#fff" : "grey"} />,
              link: "/state",
            },
            {
              title: "District",
              icon: <FaChartArea size={10} color={activeSubNavItem === 2 ? "#fff" : "grey"} />,
              link: "/district",
            },
          ],
        },
      ],
    },
    {
      title: "Poultry Breed",
      icon: <LiaTwitter size={20} color={activeNav === 2 ? "#fff"  :"grey"} />,
      link: "/poultryBreed",
    },
    {
      title: "Manage Expenses",
      icon: <FaPeopleRoof size={18} color={activeNav === 3 ? "#fff"  : "grey" } />,
      link: "/manageExpense",
    },
    {
      title: "Production",
      icon: <LuWarehouse size={14} color={activeNav === 4 ? "#fff" : "grey"} />,
      link: "/production",
    },
    {
      title: "Sales",
      icon: <FaScaleBalanced size={16} color={activeNav === 5 ? "#fff" : "grey"} />,
      link: "/sales",
    },
    {
      title: "Transaction",
      icon: <FaMoneyBillTransfer size={16} color={activeNav === 6 ? "#fff" : "grey"} />,
      link: "/transaction",
    },
  ];
  
  // const handleNavClick = (index) => {
  //   setActiveNav(activeNav === index ? null : index);
  // };

  // const handleSubNavClick = (subIndex) => {
  //   console.log("subIndex",subIndex)
  //   setActiveSubNav(activeSubNav === subIndex ? null : subIndex);
  //   console.log("activeSubNav",activeSubNav)
  // };
  // const SubNavItemsClick =(subNavItemIndex)=>{
  //   setActiveSubNavItem(activeSubNavItem===subNavItemIndex ? null :subNavItemIndex);
  // }
  const handleNavClick = (index) => {
    setActiveNav(activeNav === index ? null : index);
    setActiveSubNav(null); // Reset sub-navigation
    setActiveSubNavItem(null); // Reset sub-navigation item
    
  };

  const handleSubNavClick = (subIndex) => {
    setActiveSubNav(activeSubNav === subIndex ? null : subIndex);
    setActiveSubNavItem(null); // Reset sub-navigation item
  };

  const SubNavItemsClick = (subNavItemIndex) => {
    setActiveSubNavItem(activeSubNavItem === subNavItemIndex ? null : subNavItemIndex);
  };


  return (
    <div className="d-flex">

    <div className="side-navbar">
      <div className="sidebar-header d-flex align-items-center">
        <img src={logos} className="logo" alt="Logo" />
        <div className="sidebar-title">
          <span className="text-white">FARM</span>
          <p className="text-white">MANAGEMENT</p>
        </div>
      </div>
      <div className="sidebar-menu">
        {sideNavBarData.map((itemnav, index) => (
          <div key={index}>
            <Link to={itemnav.link} className="link" >
            <div
              className="nav-item d-flex align-items-center"
              onClick={() => handleNavClick(index)}
            >
              <span className={`nav-icon`}>{itemnav.icon}</span>
              <span className="nav-title  active" style={{color:activeNav === index ?"white" : "grey"}} >{itemnav.title}</span>
              
            </div>
            </Link>
            {activeNav === index && itemnav.SubNav && (
              <div className="sub-nav ">
                {itemnav.SubNav.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <Link to={subItem.link} className="link">
                    <div
                      className="nav-item d-flex "
                      onClick={() => handleSubNavClick(subIndex)}
                    >
                      <span className={`nav-icon`} >{subItem.icon}</span>
                      <span className="nav-title active" style={{color:activeSubNav === subIndex ?"white" : "grey"}}>{subItem.title}</span>
                    </div></Link>
                    {activeSubNav === subIndex && subItem.SubNav_Item && (
                      <div className="sub-nav-item">
                        {subItem.SubNav_Item.map((subNavItem, subNavItemIndex) => (
                          // <div
                          
                          //   key={subNavItemIndex}
                          //   className="nav-item d-flex "
                          //   onClick={() => {
                          //     window.location.pathname = subNavItem.link;
                          //   }}
                          // >
                          <div key={subNavItemIndex}>
                            <Link to={subNavItem.link}className="link">
                            <div className="nav-item d-flex " onClick={()=>SubNavItemsClick(subNavItemIndex)}>
                            <span className={`nav-icon ${activeSubNavItem === subNavItemIndex ? 'active' : ''}`}>{subNavItem.icon}</span>
                            <span className="nav-title active" style={{color:activeSubNavItem === subNavItemIndex ?"white" : "grey"}} >{subNavItem.title}</span>
                            </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
   </div>
    <div className="main-content">
      <Header/>

        {children}
        
        <Footer/>

      </div>
    </div>
  )
}

export default SideNavBar