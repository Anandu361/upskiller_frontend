import React, { useEffect } from "react";
import styled from "styled-components";
import Progress from "./progress";
import Profile from "./profile";
import Achievements from "./achievements";
import Courses from "./course";
import scrollreveal from "scrollreveal";

export default function Dashboard() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        .h1,
        .row__one,
        .row__two
      `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  return (
    <Section>
      <h1 className="h1">Welcome,John Doe</h1>
      <div className="grid">
        <div className="row__one">
          <Progress />
          <Courses />
        </div>
        <div className="row__two">
          <Achievements />
          <Profile />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: cover;
  background-color: #C0C0C0;

  .h1 {
    font-size: 2rem;
    font weight: 600;
  }
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;

    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }

    .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
