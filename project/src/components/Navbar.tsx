import { LogOut, User } from 'lucide-react';

interface NavbarProps {
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-blue-600">ERP System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <User size={20} />
            <span className="font-medium">{userName}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
