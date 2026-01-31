import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome to Home page
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Make this dashboard only tailwind css by SHAIKOT
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Click the button below to go to your dashboard.
      </p>
      <Link
        to="dashboard/dashboardHome"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
