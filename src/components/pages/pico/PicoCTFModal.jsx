// src/components/modals/PicoCTFModal.jsx
import ModalShell from "./ModalShell";
import PicoPage from "../pages/pico/PicoPage";

export default function PicoCTFModal({ isOpen, onClose }) {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="picoCTF Writeups"
      subtitle="以可重現/可驗證的方式整理解題流程"
    >
      <PicoPage />
    </ModalShell>
  );
}