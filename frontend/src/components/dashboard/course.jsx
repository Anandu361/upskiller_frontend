import React, { useEffect } from "react";
import styled from "styled-components";
import { HiArrowNarrowRight } from "react-icons/hi";
import { cardStyles } from "./reusablestyles";
import scrollreveal from "scrollreveal";

export default function Courses() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        .title,
        .course-list,
        .view
      `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const courses = [
    {
      title: "React for Beginners",
      instructor: "John Doe",
      progress: "80%",
    },
    {
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      progress: "45%",
    },
    {
      title: "UI/UX Design Principles",
      instructor: "Michael Lee",
      progress: "60%",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Your Courses</h2>
      </div>
      <div className="course-list">
        {courses.map((course) => (
          <div className="course" key={course.title}>
            <div className="course__details">
              <h3>{course.title}</h3>
              <h5>Instructor: {course.instructor}</h5>
            </div>
            <div className="course__progress">
              <span>Progress: {course.progress}</span>
            </div>
          </div>
        ))}
      </div>
      <a className="view" href="#">
        View all <HiArrowNarrowRight />
      </a>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #000000;

  .title {
    h2 {
      color: #007bff;
      font-family: "Poppins", sans-serif;
      letter-spacing: 0.3rem;
    }
  }

  .course-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .course {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      &__details {
        h3 {
          font-size: 1.2rem;
        }
        h5 {
          font-size: 0.9rem;
          color: #777;
        }
      }

      &__progress {
        background-color: #C0C0C0;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;

        &:hover {
          background-color: #007bff;

          span {
            color: #fff;
          }
        }

        span {
          color: #000000;
          font-weight: 600;
        }
      }
    }
  }

  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #007bff;
    font-weight: 600;
    margin-top: 1rem;
    gap: 0.5rem;

    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }

    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 375px) {
    .course-list {
      .course {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
