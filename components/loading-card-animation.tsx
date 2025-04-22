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
    <div className="flex items-center justify-center bg-white-100 overflow-hidden p-8">
      <div className="rounded-2xl shadow-lg">
        <Card key={key} />
      </div>
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
    <div className="relative w-[300px] h-[400px] animate-fadeOut ">
      <svg className="absolute w-full h-full" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
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

      <div className="absolute inset-0 p-6 flex flex-col gap-3">
        {/* Title line */}
        <div className="flex justify-center">
          <div className="flex gap-2 w-[55%]">
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
          <div key={rowIndex} className="flex gap-2">
            {row.map((width, i) => {
              delay += 0.3
              const isGreen = greenSegments.some((segment) => segment.row === rowIndex && segment.line === i)
              return (
                <div
                  key={i}
                  className="opacity-100"
                  style={{
                    height: "4px",
                    width,
                    backgroundColor: isGreen ? "#009E57" : "#C3C9D2",
                    borderRadius: "6px",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    animation: ` highlightLine 0.54s ease forwards ${delay}s`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
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

        .animate-fadeOut {
          animation: slideOut 16s ease-in-out forwards;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  )
}

export default LoadingCardAnimation
