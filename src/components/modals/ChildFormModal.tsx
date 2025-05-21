import React from 'react';
import { Modal } from 'antd';
import ChildForm from '../forms/ChildForm';

interface ChildFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: any;
  mode?: 'create' | 'edit';
}

const ChildFormModal: React.FC<ChildFormModalProps> = ({
  open,
  onClose,
  initialValues,
  mode = 'create'
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={mode === 'create' ? 'Nuevo Niño' : 'Editar Niño'}
      footer={null}
      width={800}
    >
      <ChildForm
        onSuccess={onClose}
        initialValues={initialValues}
        mode={mode}
      />
    </Modal>
  );
};

export default ChildFormModal;