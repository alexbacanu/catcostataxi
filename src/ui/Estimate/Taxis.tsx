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

  return (
    <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className=" w-2/5 rounded-md border border-zinc-100 p-6 dark:border-zinc-700/40">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-white/10">
            {products.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-white/10">
                  <img src={product.imageSrc} className="h-full w-full object-cover object-center" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium tracking-tight text-zinc-800 transition dark:text-zinc-100">
                      <h3>{product.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-zinc-200">Initial fee: {product.initialFee}</p>
                    <p className="mt-1 text-sm text-zinc-200">Ride time: {product.rideTime}</p>
                    <p className="mt-1 text-sm text-zinc-200">Distance: {product.distance}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between text-sm">
                  <p className="px-2 py-1 text-lg text-zinc-100">Total {product.total}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
