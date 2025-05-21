import React from 'react';
import { Modal } from 'antd';
import TutorForm from '../forms/TutorForm';

interface TutorFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: any;
  mode?: 'create' | 'edit';
}

const TutorFormModal: React.FC<TutorFormModalProps> = ({
  open,
  onClose,
  initialValues,
  mode = 'create'
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={mode === 'create' ? 'Nuevo Tutor' : 'Editar Tutor'}
      footer={null}
      width={800}
    >
      <TutorForm
        onSuccess={onClose}
        initialValues={initialValues}
        mode={mode}
      />
    </Modal>
  );
};

export default TutorFormModal;