import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/atoms';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="rounded-full w-8 h-8 p-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
