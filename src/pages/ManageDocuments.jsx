// ManageDocuments.jsx
import { useState } from "react";
import SubmitDocument from "./SubmitDocument";
import DeleteDocument from "./DeleteDocument";
import LoginGate from "./LoginGate";

export default function ManageDocuments() {
  const [activeTab, setActiveTab] = useState("submit");
  const [darkMode, setDarkMode] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const activeTabStyle = "text-white bg-gradient-to-r from-purple-600 to-blue-500";
  const inactiveTabStyle = "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white";

  if (!authenticated) {
    return (
      <div className={`min-h-screen px-4 py-8 transition-colors duration-500 ${darkMode ? "bg-gradient-to-br from-[#2e2e3a] to-[#1b1b24]" : "bg-gradient-to-br from-white to-gray-100"}`}>
        <LoginGate onAuthSuccess={() => setAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 px-4 py-8 bg-gradient-to-br ${darkMode ? "from-[#2e2e3a] to-[#1b1b24]" : "from-white to-gray-100"}`}>
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Manage Documents</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm shadow"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("submit")}
          className={`px-4 py-2 rounded-t-lg font-semibold transition duration-300 ${activeTab === "submit" ? activeTabStyle : inactiveTabStyle}`}
        >
          📤 Submit Document
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`px-4 py-2 rounded-t-lg font-semibold transition duration-300 ${activeTab === "delete" ? activeTabStyle : inactiveTabStyle}`}
        >
          🗑️ Delete Document
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out p-6 rounded-xl backdrop-blur-md ${darkMode ? "bg-white/10 text-white" : "bg-white/50 text-gray-800"} max-w-4xl mx-auto shadow-xl`}>
        {activeTab === "submit" ? <SubmitDocument darkMode={darkMode} /> : <DeleteDocument darkMode={darkMode} />}
      </div>
    </div>
  );
}
