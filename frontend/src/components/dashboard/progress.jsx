import React, { useEffect } from "react";
import styled from "styled-components";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { cardStyles } from "./reusablestyles";
import { useUserStats } from "../../context/UserStatsContext";
import scrollreveal from "scrollreveal";

export default function Progress() {
  const { stats } = useUserStats();

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 1000,
      reset: true,
      opacity: 1,
      scale: 1,
      viewFactor: 0.2,
      cleanup: true,
      beforeReveal: (el) => {
        el.style.opacity = "1";
      }
    });

    const cards = document.querySelectorAll('.progress-card');
    cards.forEach((card, index) => {
      sr.reveal(card, {
        delay: index * 200
      });
    });

    return () => sr.destroy();
  }, []);

  return (
    <Section>
      <div className="progress-card">
        <div className="content">
          <h5>Milestones Reached</h5>
          <h2>{stats.milestones.current}/{stats.milestones.total}</h2>
        </div>
        <div className="logo">
          <BsBarChartFill />
        </div>
      </div>
      <div className="progress-card">
        <div className="logo">
          <AiOutlineCheckCircle />
        </div>
        <div className="content">
          <h5>Tasks Completed</h5>
          <h2>{stats.tasksCompleted}</h2>
        </div>
      </div>
      <div className="progress-card">
        <div className="logo">
          <FaChalkboardTeacher />
        </div>
        <div className="content">
          <h5>Courses Completed</h5>
          <h2>{stats.coursesCompleted}</h2>
        </div>
      </div>
      <div className="progress-card">
        <div className="content">
          <h5>Hours Spent Learning</h5>
          <h2>{stats.hoursSpent}h</h2>
        </div>
        <div className="logo">
          <FiClock />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .progress-card {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.3s ease-in-out;
    background-color: #fff;
    opacity: 0;
    visibility: visible;

    &:hover {
      background-color: #007bff;
      color: white;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
      
      svg {
        color: white;
      }
      
      .content {
        h5, h2 {
          color: white;
        }
      }
    }

    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }

    .content {
      h5 {
        font-size: 1.1rem;
        color: black;
      }

      h2 {
        font-size: 1.8rem;
        color: black;
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    .progress-card {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
