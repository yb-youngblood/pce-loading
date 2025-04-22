"use client"

import { useEffect, useState } from "react"

function QALoadingAnimation() {
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1)
    }, 16000) // Reset animation every 16 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="qa-container">
      <div className="qa-wrapper">
        <QACard key={key} />
      </div>
      <style jsx>{`
        .qa-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          overflow: hidden;
          padding: 32px;
          max-height: 440px;
          border-radius: 16px;
        }
        
        .qa-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

// Helper function to generate random segments
function generateSegmentData(minLines, maxLines, minTotal, maxTotal) {
  const lines = Math.floor(Math.random() * (maxLines - minLines + 1)) + minLines
  const totalSegments = Math.floor(Math.random() * (maxTotal - minTotal + 1)) + minTotal

  // Distribute segments across lines
  const segments = []
  let remaining = totalSegments

  for (let i = 0; i < lines; i++) {
    if (i === lines - 1) {
      // Last line gets all remaining segments
      segments.push(remaining)
    } else {
      // Ensure at least 1 segment per line and leave enough for remaining lines
      const maxForThisLine = remaining - (lines - i - 1)
      const segmentsForLine = Math.max(1, Math.floor(Math.random() * maxForThisLine) + 1)
      segments.push(segmentsForLine)
      remaining -= segmentsForLine
    }
  }

  return segments
}

// Helper function to generate random widths for segments
function generateWidths(count, minWidth = 10, maxWidth = 40) {
  return Array.from({ length: count }, () => {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth
    return `${width}%`
  })
}

function QACard() {
  // Base delay before animations start
  let delay = 2.2

  // Generate random segments for each section
  const headerSegments = Math.floor(Math.random() * 6) + 1 // 1-6 segments
  const headerWidths = generateWidths(headerSegments)

  // First Q&A pair
  const question1Segments = Math.floor(Math.random() * 5) + 2 // 1-5 segments
  const question1Widths = generateWidths(question1Segments)

  const answer1Segments = Math.floor(Math.random() * 3) + 1 // 1-3 segments
  const answer1Widths = generateWidths(answer1Segments)

  const explanation1Lines = generateSegmentData(1, 3, 3, 9) // 1-3 lines with 2-9 total segments
  const explanation1WidthsByLine = explanation1Lines.map((count) => generateWidths(count))

  // Second Q&A pair (completely separate from the first)
  const question2Segments = Math.floor(Math.random() * 4) + 1 // 1-4 segments
  const question2Widths = generateWidths(question2Segments)

  const answer2Segments = Math.floor(Math.random() * 5) + 2 // 1-3 segments
  const answer2Widths = generateWidths(answer2Segments)

  const explanation2Lines = generateSegmentData(1, 2, 2, 7) // 1-3 lines with 2-7 total segments
  const explanation2WidthsByLine = explanation2Lines.map((count) => generateWidths(count, 15, 50)) // Slightly different widths

  return (
    <div className="qa-card">
      <svg className="qa-card-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          width="298"
          height="398"
          rx="16"
          ry="16"
          fill="white"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          stroke="#5051DB"
          strokeWidth="2"
        >
          <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="2.5s" fill="freeze" />
        </rect>
      </svg>

      <div className="qa-card-content">
        {/* Fpid section */}
        <div className="fpid-section">
          <div className="fpid-row">
            <div
              style={{
                width: "10%",
                height: "8px",
                backgroundColor: "#C3C9D2",
                borderRadius: "6px",
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `highlightLine 0.3s ease forwards`,
                animationDelay: `${delay}s`,
              }}
            />
            <div className="fpid-segments">
              {headerWidths.map((width, i) => {
                delay += 0.2
                return (
                  <div
                    key={i}
                    style={{
                      height: "8px",
                      width,
                      backgroundColor: "#C3C9D2",
                      borderRadius: "2px",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `highlightLine 0.3s ease forwards`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* First Question Block*/}
        <div className="question-block">
          {/* Question 1 */}
          <div className="question-row">
            <div className="question-segments">
              {question1Widths.map((width, i) => {
                delay += 0.2
                return (
                  <div
                    key={i}
                    style={{
                      height: "4px",
                      width,
                      backgroundColor: "#C3C9D2",
                      borderRadius: "6px",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `highlightLine 0.3s ease forwards`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
              <div
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${delay + 0.3}s`,
                }}
                className="question-mark"
              >
                ?
              </div>
            </div>
          </div>

          {/* Answer 1 */}
          <div className="answer-row">
            <div className="answer-segments">
              {answer1Widths.map((width, i) => {
                delay += 0.5
                return (
                  <div
                    key={i}
                    style={{
                      height: "4px",
                      width,
                      backgroundColor: "#5051DB",
                      borderRadius: "6px",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `highlightLine 0.3s ease forwards`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
              <div
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${delay + 0.3}s`,
                }}
                className="answer-period"
              >
                .
              </div>
            </div>
          </div>

          {/* Explanation 1 */}
          <div className="explanation-section">
            <div
              style={{
                width: "20%",
                height: "4px",
                backgroundColor: "#C3C9D2",
                borderRadius: "6px",
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `highlightLine 0.3s ease forwards`,
                animationDelay: `${delay + 0.3}s`,
              }}
            />

            {explanation1WidthsByLine.map((lineWidths, lineIndex) => {
              return (
                <div key={`exp1-${lineIndex}`} className="explanation-row">
                  {lineWidths.map((width, i) => {
                    delay += 0.5
                    return (
                      <div
                        key={i}
                        style={{
                          height: "4px",
                          width,
                          backgroundColor: "#009E57",
                          borderRadius: "6px",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          animation: `highlightLine 0.3s ease forwards`,
                          animationDelay: `${delay}s`,
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Question Block 2 */}
        <div className="question-block question-block-2">
          {/* Question 2 */}
          <div className="question-row">
            <div className="question-segments">
              {question2Widths.map((width, i) => {
                delay += 0.2
                return (
                  <div
                    key={i}
                    style={{
                      height: "4px",
                      width,
                      backgroundColor: "#C3C9D2",
                      borderRadius: "6px",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `highlightLine 0.3s ease forwards`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
              <div
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${delay + 0.3}s`,
                }}
                className="question-mark"
              >
                ?
              </div>
            </div>
          </div>

          {/* Answer 2 */}
          <div className="answer-row">
            <div className="answer-segments">
              {answer2Widths.map((width, i) => {
                delay += 0.5
                return (
                  <div
                    key={i}
                    style={{
                      height: "4px",
                      width,
                      backgroundColor: "#5051DB",
                      borderRadius: "6px",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `highlightLine 0.5s ease forwards`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
              <div
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${delay + 0.3}s`,
                }}
                className="answer-period"
              >
                .
              </div>
            </div>
          </div>

          {/* Explanation 2 */}
          <div className="explanation-section">
            <div
              style={{
                width: "20%",
                height: "4px",
                backgroundColor: "#C3C9D2",
                borderRadius: "6px",
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `highlightLine 0.3s ease forwards`,
                animationDelay: `${delay + 0.3}s`,
              }}
            />

            {explanation2WidthsByLine.map((lineWidths, lineIndex) => {
              return (
                <div key={`exp2-${lineIndex}`} className="explanation-row">
                  {lineWidths.map((width, i) => {
                    delay += 0.5
                    return (
                      <div
                        key={i}
                        style={{
                          height: "4px",
                          width,
                          backgroundColor: "#009E57",
                          borderRadius: "6px",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          animation: `highlightLine 0.3s ease forwards`,
                          animationDelay: `${delay}s`,
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .qa-card {
          position: relative;
          width: 300px;
          height: 400px;
          animation: slideOut 16s ease-in-out forwards;
          animation-fill-mode: forwards;
          overflow: hidden;
        }

        .qa-card-svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .qa-card-content {
          position: absolute;
          inset: 0;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .fpid-section {
          display: flex;
          gap: 4px;
          padding-bottom: 0;
          flex-direction: column;
        }

        .fpid-row {
          display: flex;
          gap: 8px;
        }

        .fpid-segments {
          display: flex;
          gap: 8px;
          align-items: center;
          flex: 1;
        }

        .question-block {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }

        .question-block-2 {
          padding-top: 8px;
        }

        .question-row {
          display: flex;
          align-items: center;
          gap: 0px 4px;
        }

        .question-segments {
          display: flex;
          gap: 8px;
          align-items: center;
          flex: 1;
        }

        .question-mark {
          margin-left: 4px;
          color: #C3C9D2;
          font-size: 0.75rem;
          line-height: 1;
          font-weight: 700;
        }

        .answer-row {
          display: flex;
          align-items: center;
          gap: 0px 4px;
          padding-bottom: 12px;
        }

        .answer-segments {
          display: flex;
          gap: 8px;
          align-items: baseline;
          flex: 1;
        }

        .answer-period {
          margin-left: 4px;
          color: #A9B1BF;
          font-size: 0.75rem;
          line-height: 1;
          font-weight: 700;
        }

        .explanation-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .explanation-row {
          display: flex;
          gap: 8px;
        }

        @keyframes highlightLine {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes slideOut {
          90% {
            transform: translateY(0);
            opacity: 1;
          }

          95% {
            transform: translateY(20px) scale(1.04);
            opacity: 1;
          }

          98% {
            transform: translateY(500px);
            opacity: 1;
          }

          100% {
            transform: translateY(500px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default QALoadingAnimation
