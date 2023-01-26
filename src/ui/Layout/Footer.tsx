import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900/10 dark:border-white/10">
      <div className="container mx-auto justify-between space-y-6 p-6 sm:flex sm:space-y-0">
        <div className="flex items-center justify-center">
          <p>Copyright &copy; {new Date().getFullYear()} catcostataxi.ro</p>
        </div>
        <div className="flex items-center justify-center space-x-8">
          <IconBrandGithub />
          <IconBrandTwitter />
          <IconBrandFacebook />
        </div>
      </div>
    </footer>
  )
}
