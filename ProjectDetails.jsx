import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getComments, addComment } from "../api/commentsApi";

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));

    getComments(id).then(setComments);
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    const data = {
      project_id: id,
      user_id: user.id,
      comment: text,
    };

    await addComment(data);
    setText("");
    getComments(id).then(setComments);
  };

  if (!project) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-ucu-maroon">{project.title}</h1>
      <p className="mt-4 text-gray-700 text-lg">{project.description}</p>

      <div className="mt-6 bg-white p-5 border rounded">
        <p><strong>Category:</strong> {project.category_name}</p>
        <p><strong>Faculty:</strong> {project.faculty_name}</p>
        <p><strong>Submitted by:</strong> {project.user_name}</p>
      </div>

      {/* Comments section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-4 rounded border">
              <p className="font-semibold text-ucu-maroon">{c.user_name}</p>
              <p className="mt-1">{c.comment}</p>
              <p className="text-xs text-gray-500 mt-1">{c.created_at}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {user && (
        <form onSubmit={submitComment} className="mt-6">
          <textarea
            className="border w-full p-3 rounded"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="bg-ucu-maroon text-white px-4 py-2 mt-2 rounded">
            Submit Comment
          </button>
          {project.file_path && (
         <a
         href={`http://localhost:5000/uploads/${project.file_path}`}
          target="_blank"
          className="inline-block bg-ucu-gold text-black px-4 py-2 rounded mt-4 ml-3"
          >
             Download File
         </a>
         )}
        </form>
      )}
    </div>
  );
}
