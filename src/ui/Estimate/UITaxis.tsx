"use client"

import { RadioGroup } from "@headlessui/react"
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react"
import { useState } from "react"

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
    <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
      <TaxiSelect />
      <div className="m-6 w-full space-y-4 rounded-md p-4 text-neutral-800 shadow-lg ring-1 ring-neutral-800/10 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-white/10">
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

function TaxiSelect() {
  const plans = [
    {
      type: "Normal (RON)",
      day: "2.69",
      night: "3.29",
    },
    {
      type: "Premium (RON)",
      day: "2.89",
      night: "3.59",
    },
  ]
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="flex items-center justify-center">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="flex space-x-2">
          {plans.map((plan) => (
            <RadioGroup.Option
              key={plan.type}
              value={plan}
              className={({ active, checked }) =>
                `${active ? "ring-[1.5px] ring-neutral-200" : ""}
                  ${checked ? "bg-teal-900 text-white" : "bg-white/40"}
                  ${!active && !checked ? "hover:bg-white/70" : ""}
                    relative hover:shadow-lg transition flex cursor-pointer rounded-md px-4 py-3 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`flex items-center justify-start pl-1 pb-2 font-medium transition  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plan.type}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`flex items-center justify-between space-x-2 whitespace-nowrap transition ${
                            checked ? "text-sky-100" : "text-gray-800"
                          }`}
                        >
                          <p className="flex items-center justify-between space-x-1">
                            <IconSunFilled />
                            <span>{plan.day}</span>
                          </p>
                          <span aria-hidden="true">&middot;</span>
                          <p className="flex items-center justify-between space-x-1">
                            <IconMoonFilled />
                            <span>{plan.night}</span>
                          </p>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 pl-4 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
