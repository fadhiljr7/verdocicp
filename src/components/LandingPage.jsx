import { Link } from "react-router-dom";
import computerImg from "../assets/computer.png";

export default function LandingPage() {
  return (
    <section id="hero-section">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videobackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

        {/* Main Content */}
        <div className="relative z-20 flex items-center justify-between h-full px-8 md:px-24 text-white">
          {/* Left Text Section */}
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Document Authentication
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-300 tracking-wide">
              Blockchain-Powered on the Internet Computer
            </h2>
            <p className="text-base md:text-lg">
              This verification system uses tamper-proof storage and Zero-Knowledge Proof to validate documents securely without exposing sensitive data.
            </p>
            <Link to="/app">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">
                Verify Your Document Now
              </button>
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="hidden md:block relative w-[50%]">
            {/* Komputer */}
            <img
              src={computerImg}
              alt="Computer Illustration"
              className="w-[90%] max-w-[500px] mx-auto animate-float drop-shadow-xl"
            />
            {/* Blok blockchain */}
            {/* <img
              src={blockIMG}
              alt="Blocks Illustration"
              className="absolute top-0 right-0 w-90 rotate-330 opacity-80"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
