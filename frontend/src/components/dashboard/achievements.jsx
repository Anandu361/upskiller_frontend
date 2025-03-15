import React, { useEffect } from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { cardStyles } from "./reusablestyles";
import scrollreveal from "scrollreveal";
import { useUserStats } from "../../context/UserStatsContext";

export default function Achievements() {
  const { stats } = useUserStats();

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        .top,
        .chart,
        .view
      `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const data = [
    { progress: 0 },
    { progress: 0 },
    { progress: 0 },
    { progress: 0 },
    { progress: 0 },
    { progress: 0 },
    { progress: 0 },
  ];

  return (
    <Section>
      <div className="top">
        <div className="info">
          <h5>Total Achievements</h5>
          <h1>{stats.achievements} Badges</h1>
          <div className="milestones">
            <h5>Milestones:</h5>
            <ul>
              <li>Completed {stats.coursesCompleted} Courses</li>
              <li>Earned {stats.achievements} Badges</li>
              <li>Learning Streak: {stats.learningStreak} Days</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="#4caf50"
              fill="#4caf503e"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;

  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      h1 {
        font-size: 2rem;
        color: #007bff;
      }

      .milestones {
        text-align: center;
        background-color:rgb(202, 236, 255);
        padding: 1rem;
        border-radius: 1rem;
        margin-top: 1rem;

        h5 {
          color: #007bff;
          margin-bottom: 0.5rem;
        }

        ul {
          list-style-type: none;
          padding: 0;
          li {
            margin: 0.3rem 0;
            color: #000000;
            font-weight: 600;
          }
        }
      }
    }
  }

  .chart {
    height: 100%;
    .recharts-default-tooltip {
      background-color: white !important;
      border-color: #fff !important;
      color: #007bff !important;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .top .info {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
`;
