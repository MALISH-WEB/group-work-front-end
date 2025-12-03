import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A24] text-white pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ucu-gold">UCU Innovators Hub</h3>
          <p className="text-sm text-gray-300">
            Empowering innovation and creativity across Uganda Christian University.
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ucu-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-ucu-gold">Home</Link></li>
            <li><Link to="/projects" className="hover:text-ucu-gold">Projects</Link></li>
            <li><Link to="/submit" className="hover:text-ucu-gold">Submit Project</Link></li>
            <li><Link to="/profile" className="hover:text-ucu-gold">Profile</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ucu-gold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/notifications" className="hover:text-ucu-gold">Notifications</Link></li>
            <li><Link to="/approvals" className="hover:text-ucu-gold">Approvals</Link></li>
            <li><Link to="/admin/analytics" className="hover:text-ucu-gold">Analytics</Link></li>
            <li><Link to="/admin/users" className="hover:text-ucu-gold">Manage Users</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ucu-gold">Contact</h3>
          <p className="text-sm">Uganda Christian University</p>
          <p className="text-sm">Mukono, Uganda</p>
          <p className="text-sm mt-2">Email: info@ucu.ac.ug</p>
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-ucu-gold"></a>
            <a href="#" className="hover:text-ucu-gold"></a>
            <a href="#" className="hover:text-ucu-gold"></a>
            <a href="#" className="hover:text-ucu-gold"></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8 border-t border-white/20 pt-3 text-sm text-gray-300">
        © {new Date().getFullYear()} UCU Innovators Hub — All Rights Reserved.
      </div>
    </footer>
  );
}
