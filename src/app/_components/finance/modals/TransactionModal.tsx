"use client";

import TransactionForm from "./TransactionForm";
import useModalToggle from "@/app/_hooks/useModalToggle";
import Modal from "../../shared/Modal";
import { ITransaction } from "@/app/types/interfaces";

interface Props {
  modalProps: {
    openButtonText: string;
    header: string;
  };
  thisTransaction?: ITransaction;
}

export default function TransactionModal({
  modalProps,
  thisTransaction,
}: Props) {
  const { isOpen, setIsOpen, closeModal, openModal } = useModalToggle();

  function ButtonProps() {
    return (
      <button
        type="button"
        onClick={openModal}
        className={` ${
          modalProps.openButtonText === "new"
            ? "rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            : "hover:text-gray-500 dark:hover:text-gray-600"
        }`}
      >
        {modalProps.openButtonText === "new" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <>
      <Modal
        buttonProps={<ButtonProps />}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <TransactionForm
          closeModal={closeModal}
          modalProps={modalProps}
          // TS TO FIX
          // @ts-ignore
          thisTransaction={thisTransaction}
        />
      </Modal>
    </>
  );
}
