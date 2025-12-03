import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projectApi";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const loadProjects = () => {
    getProjects({
      category_id: selectedCategory,
      faculty_id: selectedFaculty,
      search: search,
      sort: sort,
    }).then(setProjects);
  };

  useEffect(() => {
    loadProjects();
  }, [selectedCategory, selectedFaculty, search, sort]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json()).then(setCategories);

    fetch("http://localhost:5000/api/faculties")
      .then((res) => res.json()).then(setFaculties);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-ucu-maroon">Projects</h1>

      {/* SEARCH + FILTERS + SORT */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search project..."
          className="border p-3 rounded col-span-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="border p-3 rounded"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">All Faculties</option>
          {faculties.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <select
          className="border p-3 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      {/* PROJECT CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="bg-white border border-ucu-maroon/30 p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-ucu-maroon">{p.title}</h2>
            <p className="mt-2 text-gray-700">{p.description?.slice(0,120)}...</p>
            <p className="text-sm text-gray-600 mt-2">
              {p.category_name} • {p.faculty_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
