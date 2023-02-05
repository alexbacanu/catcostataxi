import RecentsCard from "@/ui/Home/RecentsCard"
import RecentsImage from "@/ui/Home/RecentsImage"

type Props = {
  recentSearches: { id: string; from: string; fromLoc: string; to: string; toLoc: string }[]
}

export default function Recents({ recentSearches }: Props) {
  return (
    <section className="transition">
      <div className="home-section gap-x-16 pb-8">
        <RecentsImage />
        {/* <AdUnit data-ad-slot="4225008821" data-ad-format="auto" data-full-width-responsive="true" /> */}
        <RecentsCard recentSearches={recentSearches} />
      </div>
    </section>
  )
}
