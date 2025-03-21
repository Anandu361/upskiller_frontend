import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./reusablestyles";
import scrollreveal from "scrollreveal";
import axiosInstance from "../../utils/axiosInstance";

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "Loading...",
    age: "Loading...",
    gender: "Loading...",
    studyPreference: "Loading...",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        .error,
        .title,
        .info,
        .container
      `,
      {
        opacity: 0,
        interval: 100,
      }
    );
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/profile/");
        setUserData({
          username: response.data.username,
          age: response.data.age,
          gender: response.data.gender,
          studyPreference: response.data.study_preference,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.response?.data?.detail || "Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <Section>
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="title">
        <h2>{userData.username}</h2>
      </div>
      <div className="info">
        <div className="container">
          <h5>Age</h5>
          <h3>{userData.age}</h3>
        </div>
        <div className="container">
          <h5>Gender</h5>
          <h3>{userData.gender}</h3>
        </div>
        <div className="container">
          <h5>Study Preference</h5>
          <h3>{userData.studyPreference}</h3>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #fff;

  .title {
    text-align: center;
    h2 {
      color: #007bff;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .info {
    display: flex;
    gap: 2rem;

    .container {
      text-align: center;

      h5 {
        font-size: 1rem;
        color: #000000;
      }

      h3 {
        font-size: 1.5rem;
        color: #007bff;
        font-weight: bold;
      }
    }
  }

  .error {
    text-align: center;
    h3 {
      color: red;
      font-size: 1.5rem;
      font-weight: bold;
    }
    p {
      font-size: 1rem;
      color: #000000;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    .info {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;
