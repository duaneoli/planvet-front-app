import React from "react";
import { UserResponseDTO } from "@/api/planvet/dto/response/UserResponseDTO";
import { AddressForm } from "@/components/forms/AddressForm";
import Modal from "@/components/modal/Modal";

interface AddressEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserResponseDTO;
}

const AddressEditModal: React.FC<AddressEditModalProps> = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atualizar Endereço">
      <div className="w-full min-w-[min(480px,calc(100vw-4rem))]">
        <p className="text-sm text-slate-500 mb-6">
          Precisamos do seu endereço para emitir a cobrança. Preencha os dados abaixo e salve.
        </p>
        <AddressForm
          defaultValues={{
            cep: user?.cep ?? "",
            street: user?.street ?? "",
            streetNumber: Number(user?.streetNumber) || undefined,
            streetComplement: user?.streetComplement ?? "",
            neighborhood: user?.neighborhood ?? "",
            city: user?.city?.nome ?? "",
            state: user?.state?.uf ?? "",
          }}
          onSuccess={onClose}
          form={{
            leftButton: { text: "Cancelar", onClick: onClose },
            rigthButton: { text: "Salvar endereço" },
          }}
        />
      </div>
    </Modal>
  );
};

export default AddressEditModal;
