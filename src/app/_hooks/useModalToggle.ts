"use client";

import { useState } from "react";

export default function useModalToggle() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return { isOpen, setIsOpen, closeModal, openModal };
}
