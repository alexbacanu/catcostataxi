import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/10 transition dark:border-white/10">
      <div className="home-section flex-col gap-y-4 py-6 sm:flex-row">
        <div className="flex items-center justify-center">
          Copyright &copy; {new Date().getFullYear()} catcostataxi.ro
        </div>
        <div className="flex items-center justify-center space-x-6">
          <IconBrandGithub />
          <IconBrandTwitter />
          <IconBrandFacebook />
        </div>
      </div>
    </footer>
  )
}
