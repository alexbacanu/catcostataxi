export default function Taxis() {
  const products = [
    {
      id: 1,
      name: "UberX",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_341,h_192/v1597151255/assets/af/a978c2-d3de-4b6b-a80e-001ef05370ff/original/UberX.jpg",
    },
    {
      id: 2,
      name: "UberXL",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_343,h_193/v1597151268/assets/63/1ac810-8fe1-40ad-933f-6cb8570db48b/original/UberXL.jpg",
    },
    {
      id: 3,
      name: "UberSelect",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_343,h_193/v1597151125/assets/cb/c5b75b-5b9e-4ba9-9708-d10f27e7242a/original/Comfort.jpg",
    },
  ]

  //   <div className="m-6 w-1/3 space-y-4 rounded-md p-4 shadow-lg ring-1 ring-zinc-900/10 dark:bg-neutral-900 dark:ring-white/10">
  //   <h2 className="flex justify-center space-x-2">
  //     <IconHistory />
  //     <span>Cautari Recente</span>
  //   </h2>

  //   <ol className="space-y-2">
  //     {recentSearches.map((item) => {
  //       const { from, to, id } = item

  //       return (
  //         <li key={id} className="line-clamp-1">
  //           <Link href={`/estimat/${id}`}>
  //             <span>{from}</span>
  //             {" -> "}
  //             <span>{to}</span>
  //           </Link>
  //         </li>
  //       )
  //     })}
  //   </ol>
  // </div>

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
      <div className="m-6 w-full space-y-4 rounded-md p-4 text-neutral-800 shadow-lg ring-1 ring-zinc-900/10 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-white/10">
        <ul role="list" className="divide-dark/10 divide-y dark:divide-white/10">
          {products.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 overflow-hidden rounded-md border border-black/10 dark:border-white/10">
                <img src={product.imageSrc} className="h-full w-full object-cover object-center" />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium tracking-tight transition">
                    <h3>{product.name}</h3>
                  </div>
                  <p className="mt-1 text-sm">Initial fee: {product.initialFee}</p>
                  <p className="mt-1 text-sm">Ride time: {product.rideTime}</p>
                  <p className="mt-1 text-sm">Distance: {product.distance}</p>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between text-sm">
                <p className="px-2 py-1 text-lg">Total {product.total}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
