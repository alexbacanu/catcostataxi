import Image from "next/image"

export default function TaxiImage() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
        aria-hidden="true"
      >
        <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.9" />
        <defs>
          <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stopColor="#134e4a" />
            <stop offset={1} stopColor="#134e4a" stopOpacity={1} />
          </radialGradient>
        </defs>
      </svg>

      <div className="flex items-center justify-center pr-12 pt-6 lg:pt-0">
        <Image
          src="/undraw_duplicate.svg"
          alt="Add your taxi call to action"
          width={865 * 0.6}
          height={601 * 0.6}
          priority
        />
      </div>
    </>
  )
}
