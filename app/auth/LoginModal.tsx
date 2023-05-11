"use client";
import Modal from "../components/Modal";
import LoginForm from "./LoginForm";
import useLoginModalStore from "../store/LoginModalStore";

interface Props {
  header: string;
  isMobile: boolean;
}

export default function LoginModal({ header, isMobile }: Props) {
  const { onClose } = useLoginModalStore();

  const bodyContent = <LoginForm />;

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
