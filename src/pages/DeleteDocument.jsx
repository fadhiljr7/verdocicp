import { useState } from "react";
import { backend } from "../declarations/backend";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteDocument({ darkMode }) {
  const [fileName, setFileName] = useState("");
  const [hash, setHash] = useState("");
  const [statusSteps, setStatusSteps] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showDropBox, setShowDropBox] = useState(true);

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
    setStatusSteps([]);
    setShowDropBox(false);
  };

  const handleDelete = async () => {
    if (!hash) return;
    setIsDeleting(true);
    setStatusSteps(["🔌 Connecting to canister..."]);

    try {
      // Simulasi koneksi dengan delay backend asli bisa disini kalau ada
      await backend.removeDocumentHash(hash);
      setStatusSteps((prev) => [...prev, "✅ Document successfully deleted!"]);
    } catch (err) {
      setStatusSteps((prev) => [...prev, "❌ Failed to delete document."]);
    }

    setIsDeleting(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDrop={dropHandler}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      {showDropBox && (
        <div
          className={`p-4 mb-4 text-center border-2 border-dashed ${
            isDragging ? "border-red-500" : "border-gray-400"
          } rounded text-sm transition-all duration-300`}
        >
          {isDragging ? "Drop your document here" : "Or drag and drop your document here"}
        </div>
      )}

      <input
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
        className="mb-4 block w-full text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-red-600 file:text-white hover:file:bg-red-700"
      />

      {fileName && (
        <div className="text-sm mb-4">
          Selected: <strong>{fileName}</strong>
        </div>
      )}

      {hash && (
        <div className="text-center">
          <button
            onClick={handleDelete}
            className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
            disabled={isDeleting}
          >
            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-red-600 to-red-400"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-red-600 to-red-400"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-600 to-red-400"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-red-600 from-red-500"></span>
            <span className="relative flex items-center justify-center">
              {isDeleting && (
                <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              Delete Document
            </span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {statusSteps.length > 0 && (
          <ul className="mt-4 text-sm space-y-1">
            {statusSteps.map((msg, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {msg}
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
}
