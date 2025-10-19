import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
};

export default function Modal({ isOpen, onClose, type, title, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl transform transition-all">
        <div className="text-center">
          {/* Ícono */}
          <div className="mb-6">
            {type === 'success' ? (
              <IoCheckmarkCircle className="text-6xl text-green-500 mx-auto" />
            ) : (
              <IoCloseCircle className="text-6xl text-red-500 mx-auto" />
            )}
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {title}
          </h3>

          {/* Mensaje */}
          <div className="text-gray-600 mb-8 whitespace-pre-line text-left">
            {message}
          </div>

          {/* Botón */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors cursor-pointer ${
              type === 'success' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}