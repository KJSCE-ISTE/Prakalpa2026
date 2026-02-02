import { useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Prakalpa’26?",
      answer:
        "Prakalpa’26 is the 17th edition of ISTE KJSCE’s flagship event, focused on innovation through paper and working model presentations."
    },
    {
      question: "Who is organizing Prakalpa’26?",
      answer:
        "Prakalpa’26 is organized by ISTE KJSCE to encourage research, creativity, and technical excellence."
    },
    {
      question: "Who can participate in Prakalpa’26?",
      answer:
        "Students from engineering and related disciplines across colleges can participate in Prakalpa’26."
    },
    {
      question: "Is Prakalpa’26 a national-level competition?",
      answer:
        "Yes, Prakalpa’26 is a national-level competition with participation from institutions across India."
    },
    {
      question: "What domains are included in Prakalpa’26?",
      answer:
        "Prakalpa’26 includes multiple technical and interdisciplinary domains. Details will be announced soon."
    },
    {
      question: "How can participants register for Prakalpa’26?",
      answer:
        "Registration details will be shared through official ISTE KJSCE communication channels."
    }
  ];

  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3);

  const renderFaqs = (list: typeof faqs, offset: number) =>
    list.map((faq, index) => {
      const actualIndex = index + offset;

      return (
        <div key={actualIndex}>
          <div
            className={`faq-card ${
              openIndex === actualIndex ? "active" : ""
            }`}
            onClick={() =>
              setOpenIndex(
                openIndex === actualIndex ? null : actualIndex
              )
            }
          >
            {faq.question}
          </div>

          {openIndex === actualIndex && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      );
    });

  return (
    <section className="faq-container">
      <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>

      <div className="faq-grid">
        <div className="faq-column">
          {renderFaqs(leftFaqs, 0)}
        </div>

        <div className="faq-column">
          {renderFaqs(rightFaqs, 3)}
        </div>
      </div>
    </section>
  );
}
