import { Link } from "react-router-dom";
import hero from "../assets/home.jpg";

export default function Home() {
  return (
    <div
      className="h-[88vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="bg-black/60 w-full h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-ucu-gold drop-shadow-lg">
            UCU Innovators Hub
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Showcasing innovative research, creative solutions, and brilliant projects
            across all faculties at Uganda Christian University.
          </p>

          <div className="mt-8 flex justify-center gap-6">
            <Link
              to="/projects"
              className="bg-ucu-gold text-ucu-maroon font-bold px-6 py-3 rounded-lg text-lg shadow hover:bg-yellow-400 transition"
            >
              Explore Projects
            </Link>

            <Link
              to="/submit"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-black transition"
            >
              Submit Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
