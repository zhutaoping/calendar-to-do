"use client";
import Modal from "../../components/Modal";
import RequestForm from "./RequestForm";
import { useRequestModalStore } from "../../stores/RequestModalStore";

interface Props {
  header: string;
  isMobile: boolean;
}

export default function RequestModal({ header, isMobile }: Props) {
  const { onClose } = useRequestModalStore();

  const bodyContent = <RequestForm />;

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={true}
      isMobile={isMobile}
    />
  );
}
