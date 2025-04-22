import LoadingCardAnimation from "@/components/loading-card-animation"
import QALoadingAnimation from "@/components/qa-loading-animation"

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-center min-h-screen gap-8">
      <LoadingCardAnimation />
      <QALoadingAnimation />
    </main>
  )
}
