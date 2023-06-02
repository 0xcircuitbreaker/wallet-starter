import { Disclosure } from "@headlessui/react"
import Jdenticon from "react-jdenticon"
import pelagusLogo from "url:/assets/icon.png"
import { useLocation } from "wouter"

import "../../style.css"

import { ChevronDownIcon } from "@heroicons/react/24/outline"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import type { Network } from "~background/services/network/chains"

const storage = new Storage({ area: "local" })

export default function MenuBar({ activeWallet }) {
  const [location, setLocation] = useLocation()

  const [activeNetwork] = useStorage<Network>({
    key: "active_network",
    instance: storage
  })

  function networkButtonClick() {
    if (location === "/settings/network") {
      setLocation("/")
    } else {
      setLocation("/settings/network")
    }
  }

  function clickAccountButton() {
    // if location contains /accounts, go to home
    // else go to /accounts
    console.log(location)
    if (location.includes("accounts")) {
      setLocation("/")
    } else {
      setLocation("/accounts?/" + activeWallet.pubkey)
    }
  }

  return (
    <div className=" secondary-bg-container fixed top-0 w-full z-50">
      <div className=" min-h-full">
        <Disclosure as="nav" className="bg-transparent">
          <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => setLocation("/")}>
                  <img
                    className="h-9"
                    src={pelagusLogo}
                    alt="Pelagus Extension"
                  />
                </div>
              </div>
              <Disclosure.Button
                onClick={() => networkButtonClick()}
                className="secondary-bg-container btn-hover w-1/3 rounded-full border border-.5 border-white inline-flex items-center justify-center ease-in-out focus:outline-none p-1">
                <div className="w-full flex flex-row items-center justify-center px-1">
                  <div className="text-center">{activeNetwork?.name}</div>
                  <ChevronDownIcon className="w-3 h-3" />
                </div>
              </Disclosure.Button>
              <div
                className="p-1 my-1 mr-1 border-2 rounded-full border-blue-600 dark:border-blue-400 cursor-pointer shadow shadow-blue-400 overflow-hidden"
                onClick={() => clickAccountButton()}>
                {activeWallet ? (
                  <Jdenticon
                    size="38"
                    value={activeWallet.pubkey ? activeWallet.pubkey : ""}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </div>
  )
}
