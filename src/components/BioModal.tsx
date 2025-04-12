import { useState, useEffect } from "react";

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedBio: string | null) => void;
  initialBio?: string | null;
}

const BioModal = ({ isOpen, onClose, onSubmit, initialBio }: BioModalProps) => {
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setBio(initialBio ?? null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialBio]);

  const handleSubmit = () => {
    onSubmit(bio);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-6">
      <div className="absolute inset-0 backdrop-blur-xl backdrop-brightness-40"></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg z-10 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Edit Bio</h2>
        <div className="mb-6">
          <textarea
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none resize-none overflow-y-scroll"
            rows={4}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioModal;
