"use client"

import { useEffect, useState } from "react"

const ROW_PATTERNS = [
  ["40%", "20%", "50%", "30%"],
  ["50%", "40%", "60%"],
  ["30%", "10%", "40%", "35%"],
  ["70%", "20%"],
  ["60%", "50%", "30%"],
  ["30%", "60%", "10%"],
  ["40%", "50%", "20%", "10%"],
  ["60%", "30%", "40%"],
  ["50%", "50%", "60%"],
  ["40%", "30%", "60%"],
]

function LoadingCardAnimation() {
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1)
    }, 16000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-container">
      <div className="card-wrapper">
        <Card key={key} />
      </div>
      <style jsx>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          overflow: hidden;
          padding: 32px;
          max-height: 440px;
          border-radius: 16px;
        }
        
        .card-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

function Card() {
  const delayStart = 2.3
  let delay = delayStart
  const numGreenSegments = Math.floor(Math.random() * 5) + 1
  const greenSegments = []

  for (let i = 0; i < numGreenSegments; i++) {
    const randomRow = Math.floor(Math.random() * ROW_PATTERNS.length)
    const randomLine = Math.floor(Math.random() * ROW_PATTERNS[randomRow].length)
    greenSegments.push({ row: randomRow, line: randomLine })
  }

  return (
    <div className="card">
      <svg className="card-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
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

      <div className="card-content">
        {/* Title line */}
        <div className="title-container">
          <div className="title-segments">
            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, i) => {
              // Calculate width for each segment to total ~55% with gaps
              const segmentCount = Math.floor(Math.random() * 3) + 1
              const gapSpace = (segmentCount - 1) * 2 // 2% for each gap
              const totalSegmentWidth = 100 - gapSpace
              const widthPercent = Math.floor(Math.random() * 20) + (totalSegmentWidth / segmentCount - 10)

              return (
                <div
                  key={i}
                  style={{
                    height: "8px",
                    width: `${widthPercent}%`,
                    backgroundColor: "#C3C9D2",
                    borderRadius: "2px",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    animation: `highlightLine 0.5s ease forwards ${delay + i * 0.2}s`,
                  }}
                />
              )
            })}
          </div>
        </div>

        {ROW_PATTERNS.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((width, i) => {
              delay += 0.3
              const isGreen = greenSegments.some((segment) => segment.row === rowIndex && segment.line === i)
              return (
                <div
                  key={i}
                  className="segment"
                  style={{
                    height: "4px",
                    width,
                    backgroundColor: isGreen ? "#009E57" : "#C3C9D2",
                    borderRadius: "6px",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    animation: `highlightLine 0.54s ease forwards ${delay}s`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .card {
          position: relative;
          width: 300px;
          height: 400px;
          animation: slideOut 16s ease-in-out forwards;
          animation-fill-mode: forwards;
        }

        .card-svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .card-content {
          position: absolute;
          inset: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .title-container {
          display: flex;
          justify-content: center;
        }

        .title-segments {
          display: flex;
          gap: 8px;
          width: 55%;
        }

        .row {
          display: flex;
          gap: 8px;
        }

        .segment {
          opacity: 1;
        }

        @keyframes highlightLine {
          to {
            transform: scaleX(1);
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

export default LoadingCardAnimation
