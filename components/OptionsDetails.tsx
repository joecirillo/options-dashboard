"use client";

import { Option } from "@/types";
import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  option: Option;
}

const OptionsDetails = ({ isOpen, closeModal, option }: CarDetailsProps) => {
  const {
    description,
    bid,
    ask,
    last,
    underlying,
    strike,
    expiration_date,
    expiration_type,
    option_type,
    volume,
    close,
    root_symbol,
  } = option;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex flex-col mt-3 bg-gray-100 rounded-lg p-4">
                    <h1 className="font-bold text-[20px] text-center mb-3">
                      {root_symbol}
                    </h1>
                    {Object.entries({
                      description,
                      bid,
                      ask,
                      last,
                      volume,
                      close,
                      underlying,
                      strike,
                      expiration_date,
                      expiration_type,
                      option_type,
                    }).map(([key, value]) => (
                      <div className="flex justify-between mt-3 capitalize">
                        <h3>{key.split("_").join(" ")}</h3>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OptionsDetails;
