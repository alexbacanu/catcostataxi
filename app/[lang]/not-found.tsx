import Image from "next/image";

export default async function NotFound() {
  return (
    <section className="layout-mx flex h-screen flex-col justify-start">
      <h1 className="py-4 text-6xl font-bold">404</h1>
      <h2 className="pb-4">Ne pare rău, nu am găsit nicio rută</h2>
      <h2 className="pb-4">Sorry, no route found</h2>
      <div className="relative w-auto">
        <Image
          src="/undraw_exploring.svg"
          alt="No route found"
          className="max-h-[80vh] w-auto"
          width={36}
          height={36}
        />
      </div>
    </section>
  );
}
