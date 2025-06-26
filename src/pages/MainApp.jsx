import { useState, useEffect } from "react";
import { backend } from "../declarations/backend";
import verifierList from "../data/verifiers.json";
import verifiedIcon from "../assets/verified.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function MainApp() {
  const [fileName, setFileName] = useState("");
  const [hash, setHash] = useState("");
  const [result, setResult] = useState("");
  const [docInfo, setDocInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusSteps, setStatusSteps] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showDropBox, setShowDropBox] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("transition-colors", "duration-500");
  }, []);

  const handleFile = async (file) => {
    if (!file) return;

    setFileName(file.name);
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
    setResult("");
    setStatusSteps([]);
    setDocInfo(null);
    setShowDropBox(false);
  };

  const handleCheck = async () => {
    if (!hash) return;

    setIsProcessing(true);
    setStatusSteps(["🔌 Connecting to canister..."]);

    try {
      const response = await backend.getDocument(hash);
      setStatusSteps((prev) => [...prev, "⏳ Verifying document on chain..."]);
      setIsProcessing(false);

      if (response.length === 0) {
        setResult("❌ Document not found — possibly unauthentic.");
        setDocInfo(null);
      } else {
        const doc = response[0];
        setResult("✅ Document is authentic!");
        setDocInfo(doc);
      }
    } catch (err) {
      console.error(err);
      setResult("⚠️ Error verifying document.");
      setDocInfo(null);
      setIsProcessing(false);
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeaveHandler = () => setIsDragging(false);

  const bg = darkMode ? "from-[#2e2e3a] to-[#1b1b24]" : "from-white to-gray-100";
  const textColor = darkMode ? "text-white" : "text-gray-800";
  const border = darkMode ? "border-white/20" : "border-gray-300/50";
  const panelBg = darkMode ? "bg-white/10" : "bg-white/50";

  return (
    <div className={`min-h-screen transition-colors bg-gradient-to-br ${bg} flex flex-col items-center justify-center px-4 py-8`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm shadow"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div
        className={`backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-xl border ${border} ${textColor}`}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Blockchain-Based Document Verification</h2>

        <input
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
          className="mb-4 block w-full text-sm file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />

        {showDropBox && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-4 text-center border-2 border-dashed ${isDragging ? "border-blue-500" : "border-gray-400"} rounded text-sm transition-all duration-300`}
          >
            {isDragging ? "Drop your document here" : "Or drag and drop your document here"}
          </motion.div>
        )}

        {fileName && <p className="mb-4 text-sm"><strong>File:</strong> {fileName}</p>}

        {hash && (
          <div className="text-center">
            <button
              onClick={handleCheck}
              className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
              disabled={isProcessing}
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span className="relative flex items-center justify-center">
                {isProcessing && <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                Check Document
              </span>
            </button>
          </div>
        )}

        <AnimatePresence>
          {statusSteps.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm space-y-1"
            >
              {statusSteps.map((msg, idx) => (
                <motion.li key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  {msg}
                </motion.li>
              ))}
            </motion.ul>
          )}

          {result && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-base font-semibold"
            >
              {result}
            </motion.div>
          )}

          {docInfo && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-4 text-sm p-4 rounded border ${border} ${panelBg}`}
            >
              <p className="flex items-center gap-2">
                <strong>Submitted by:</strong>
                {docInfo.verifier.toString()}
                {verifierList[docInfo.verifier.toString()] ? (
                  <span className="flex items-center gap-1 text-green-400 font-medium">
                    <img src={verifiedIcon} alt="verified" className="w-4 h-4" />
                    {verifierList[docInfo.verifier.toString()]}
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">!Unauthorized Verifier</span>
                )}
              </p>
              <p><strong>Timestamp:</strong> {new Date(Number(docInfo.timestamp) / 1_000_000).toLocaleString()}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}