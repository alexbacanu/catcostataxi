import RecentsCard from "@/ui/Home/RecentsCard"
import RecentsImage from "@/ui/Home/RecentsImage"

type Props = {
  recentSearches: { id: string; from: string; to: string }[]
}

export default function Recents({ recentSearches }: Props) {
  return (
    <section className="transition">
      <div className="home-section gap-x-16 pb-8">
        <RecentsImage />
        <RecentsCard recentSearches={recentSearches} />
      </div>
    </section>
  )
}
