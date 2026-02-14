import { useModalStore } from '@/store';

export const useModal = () => {
  const { isOpen, selectedPost, openModal, closeModal } = useModalStore();

  return {
    isOpen,
    selectedPost,
    openModal,
    closeModal,
  };
};
