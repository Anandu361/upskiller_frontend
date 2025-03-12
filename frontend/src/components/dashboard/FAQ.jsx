import React, { useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineBook } from "react-icons/ai";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaMedal } from "react-icons/fa";
import { cardStyles } from "./reusablestyles";
import scrollreveal from "scrollreveal";

export default function FAQ() {
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
        .faqs
      `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const faqs = [
    {
      icon: <AiOutlineBook />,
      question: "How to track your course progress effectively?",
      answer:
        "You can track your progress through the 'Progress' section on your dashboard, which shows completed courses, achievements, and learning hours.",
    },
    {
      icon: <MdTipsAndUpdates />,
      question: "Tips to improve your learning methods.",
      answer:
        "Set aside dedicated learning time, review course materials regularly, and practice with interactive exercises to reinforce your knowledge.",
    },
    {
      icon: <FaMedal />,
      question: "Understanding achievements and badges.",
      answer:
        "Achievements and badges are awarded when you complete courses or meet specific learning milestones. Check the 'Achievements' tab for details.",
    },
    {
      icon: <AiOutlineBook />,
      question: "How to reset my course progress?",
      answer:
        "To reset your course progress, navigate to the course settings and select 'Reset Progress.' Note that this action cannot be undone.",
    },
    {
      icon: <MdTipsAndUpdates />,
      question: "What is the best way to ask for help in courses?",
      answer:
        "Use the course discussion forums or contact support via the 'Help' section. Be clear and specific in your queries for faster assistance.",
    },
    {
      icon: <FaMedal />,
      question: "How do I earn certificates?",
      answer:
        "Certificates are earned by completing all modules of a course and passing the final assessment with a minimum required score.",
    },
  ];

  return (
    <Section>
      <div className="title">
        <h2>FAQs for Learners</h2>
      </div>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <div key={index} className="faq">
            <div className="info">
              {faq.icon}
              <h4>{faq.question}</h4>
            </div>
            <IoIosArrowForward />
            <div className="answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  .title {
    h2 {
      color: #007bff;
      font-family: "Poppins", sans-serif;
      letter-spacing: 0.3rem;
    }
  }
  .faqs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .faq {
      position: relative; /* Ensure answer is positioned relative to the FAQ item */
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      padding: 0.5rem;
      border-radius: 0.5rem;

      .info {
        display: flex;
        gap: 1rem;
        align-items: center;

        svg {
          font-size: 1.5rem;
          color: #007bff;
        }

        h4 {
          font-size: 1rem;
          color: #000000;
        }
      }

      svg {
        font-size: 1.4rem;
        color: #000000;
      }

      &:hover {
        background-color: #f1f1f1;

        .info h4 {
          color: #000;
        }

        svg {
          color: #000;
        }

        .answer {
          max-height: 100px; /* Adjust based on the answer content size */
          opacity: 1;
          font-weight: 600;
        }
      }

      .answer {
        max-height: 0; /* Initially hidden */
        overflow: hidden; /* Hide content when collapsed */
        opacity: 0;
        position: absolute;
        top: 110%; /* Position it slightly below the FAQ item */
        left: 0;
        width: 100%;
        padding: 0.5rem;
        background-color: #e9f5ff;
        border-radius: 0.5rem;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10;
        transition: max-height 0.3s ease, opacity 0.3s ease;

        p {
          margin: 0;
          color: #333;
          font-size: 0.9rem;
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .faqs {
      .faq {
        svg {
          font-size: 2rem !important;
        }
      }
    }
  }
`;

