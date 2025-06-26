import stackImage from "../assets/systemarch.png";
import { Link } from "react-router-dom";

export default function ModularStackSection() {
  return (
    <section
      id="stack"
      className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-20 bg-gradient-to-br from-white to-slate-100 dark:from-[#0e0e1a] dark:to-[#151521]"
    >
      <img
        src={stackImage}
        alt="Modular Stack ICP"
        className="w-full md:w-1/2 max-w-md drop-shadow-xl"
      />

      <div className="text-center md:text-left max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-800 dark:text-white">
          Decentralized Stack for
          <br />
          <span className="text-blue-500">Trustless Document Verification</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Build for preserving document authenticity with zero-knowledge proofs and tamper-resistant layers on
          the Internet Computer Protocol with modular, verifiable layers.
        </p>
        <Link to="/manage" class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Store Documents</span>
        </Link>
      </div>
    </section>
  );
}