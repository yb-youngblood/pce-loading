import LoadingCardAnimation from "@/components/loading-card-animation"
import QALoadingAnimation from "@/components/qa-loading-animation"

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "32px",
        padding: "16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LoadingCardAnimation />
      <QALoadingAnimation />
    </main>
  )
}
