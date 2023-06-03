'use client'
import Modal from '../components/Modal'
import LoginForm from './LoginForm'
import { useLoginModalStore } from '../stores/LoginModalStore'

interface Props {
  header: string
  isMobile: boolean
}

const LoginModal = ({ header, isMobile }: Props) => {
  const { onClose } = useLoginModalStore()

  const bodyContent = <LoginForm />

  return (
    <Modal
      header={header}
      onClose={onClose}
      body={bodyContent}
      fullPage={true}
      isMobile={isMobile}
    />
  )
}
export default LoginModal
