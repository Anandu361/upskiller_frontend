import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LuSchool } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserAlt, FaBook } from "react-icons/fa";
import { RiBarChartBoxFill } from "react-icons/ri";
import { GiTrophy } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import scrollreveal from "scrollreveal";

export default function Sidebar() {
  const location = useLocation();
  const [currentLink, setCurrentLink] = useState("");

  useEffect(() => {
    setCurrentLink(location.pathname); // Update current link based on the current route
  }, [location]);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(`.links > ul > li, .logout`, {
      opacity: 0,
      interval: 300,
    });
  }, []);

  return (
    <Section>
      <div className="top">
        <div className="brand">
          <LuSchool />
          <span>Upskiller</span>
        </div>
        <div className="links">
          <ul>
            <li className={currentLink === "/dashboard" ? "active" : ""}>
              <Link to="/dashboard">
                <MdSpaceDashboard />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={currentLink === "/profile" ? "active" : ""}>
              <Link to="/profile">
                <FaUserAlt />
                <span>My Profile</span>
              </Link>
            </li>
            <li className={currentLink === "/course" ? "active" : ""}>
              <Link to="/course">
                <FaBook />
                <span>My Courses</span>
              </Link>
            </li>
            <li className={currentLink === "/progress" ? "active" : ""}>
              <Link to="/progress">
                <RiBarChartBoxFill />
                <span>Progress</span>
              </Link>
            </li>
            <li className={currentLink === "/achievements" ? "active" : ""}>
              <Link to="/achievements">
                <GiTrophy />
                <span>Achievements</span>
              </Link>
            </li>
            <li className={currentLink === "/FAQ" ? "active" : ""}>
              <Link to="/FAQ">
                <BsFillChatTextFill />
                <span>FAQ</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="logout">
        <Link to="/">
          <FiLogOut />
          <span>Logout</span>
        </Link>
      </div>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: transparent;
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;

  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 0 1rem;

    .brand {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      padding-left: 1rem;
      opacity: 1 !important; /* Force brand to always be visible */
      
      svg {
        color: #fff;
        font-size: 4rem;
      }
      
      span {
        font-size: 1.5rem;
        color: #fff;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
      }
    }

    .links {
      display: flex;
      width: 100%;
      
      
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        width: 100%;
        
        li {
          width: 100%;
          
          a {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 1rem;
            color: #fff;
            padding: 0.8rem 1rem;
            border-radius: 50px;
            transition: all 0.3s ease;
            width: 100%;
            
            
            svg {
              font-size: 1.2rem;
            }
            
            span {
              font-size: 0.9rem;
              font-weight: 600;
            }
            
            &:hover {
              background: #fff;
              color: #000000;
              box-shadow: 0 2px 5px rgb(255, 255, 255);
            }
          }
        }
        
        .active {
          a {
            background: #007bff;
            color: #fff;
            box-shadow: 0 2px 5px rgb(0, 123, 255);
          }
        }
      }
    }
  }

  .logout {
    padding: 0 1rem;
    width: 100%;
    
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #fff;
      padding: 0.8rem 1rem;
      border-radius: 50px;
      transition: all 0.3s ease;
      width: 100%;
      
      svg {
        font-size: 1.2rem;
      }
      
      span {
        font-size: 0.9rem;
        font-weight: 600;
      }
      
      &:hover {
        background: rgb(178, 34, 34);
        color: #fff;
        box-shadow: 0 2px 5px rgb(178, 34, 34);
      }
    }
  }
`;