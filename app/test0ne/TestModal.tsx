import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import FocusTrap from "focus-trap-react";

// interface Props {
//   header: string;
//   onClose: () => void;
//   body: JSX.Element;
//   footer?: JSX.Element;
//   disabled?: boolean;
//   onSubmit?: () => void;
//   fullPage?: boolean;
//   isMobile?: boolean;
// }

const TestModal = (
  {
    // header,
    // onClose,
    // body,
    // footer,
    // disabled,
    // onSubmit,
    // fullPage,
    // isMobile,
  }
) => {
  return (
    <div>
      <h1>Test Heading</h1>
      <button type="button">Test Button</button>
    </div>
  );
};
export default TestModal;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const fadeIn = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};
