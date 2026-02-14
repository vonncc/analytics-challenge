import { create } from 'zustand';
import { PostWithEngagement } from '@/types';

interface ModalState {
  isOpen: boolean;
  selectedPost: PostWithEngagement | null;
  openModal: (post: PostWithEngagement) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedPost: null,

  openModal: (post) => set({ isOpen: true, selectedPost: post }),

  closeModal: () => set({ isOpen: false, selectedPost: null }),
}));
