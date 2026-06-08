import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(
    localStorage.getItem("userData")
  );

  const handleLogout = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      localStorage.removeItem("userData");

      window.location.href = "/signin";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Todo App
        </Link>

        <nav className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/create"
              className="text-gray-700 hover:text-blue-600"
            >
              Create
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600"
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/signin"
                className="text-gray-700 hover:text-blue-600"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 text-sm">
                {user.fullname}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;