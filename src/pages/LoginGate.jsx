import { useState } from "react";
import authData from "../data/auth.json";

function sha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

export default function LoginGate({ onAuthSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [matchedUser, setMatchedUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const hashed = await sha256(password);
      const found = authData.users.find(
        (u) => u.username === username && u.passwordHash === hashed
      );
      if (found) {
        setMatchedUser(found);
        setStep(2);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Error processing password hash");
      console.error("Hash error:", err);
    }
  };

  const handlePinCheck = (e) => {
    e.preventDefault();
    if (matchedUser && pin === matchedUser.pin) {
      setError("");
      onAuthSuccess();
    } else {
      setError("Invalid PIN");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 rounded-xl shadow-xl bg-white/50 backdrop-blur dark:bg-white/10">
      <h2 className="text-xl font-semibold mb-4 text-center">🔐 Secure Access</h2>

      {step === 1 && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium"
          >
            Login
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePinCheck} className="space-y-4">
          <input
            type="password"
            placeholder="6-digit PIN"
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            maxLength={6}
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium"
          >
            Verify PIN
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
