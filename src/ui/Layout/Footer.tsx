import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl justify-between space-y-6 py-6 px-4 text-zinc-600 dark:text-zinc-400 sm:flex sm:space-y-0 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p>Copyright &copy; {new Date().getFullYear()} catcostataxi.ro</p>
        </div>
        <div className="flex items-center justify-center space-x-10">
          <IconBrandGithub />
          <IconBrandTwitter />
          <IconBrandFacebook />
        </div>
      </div>
    </footer>
  )
}
