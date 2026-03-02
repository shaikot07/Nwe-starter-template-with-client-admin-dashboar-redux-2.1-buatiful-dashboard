import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <section className="py-10 bg-white font-serif min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center max-w-2xl w-full">
              {/* Background GIF Section */}
              <div
                className="h-[400px] bg-center bg-no-repeat flex items-center justify-center animate-pulse"
                style={{
                  backgroundImage:
                    "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                }}
              >
                <h1 className="text-[80px] font-bold text-black animate-bounce">
                  404
                </h1>
              </div>

              {/* Content Box */}
              <div className="-mt-12">
                <h3 className="text-3xl font-semibold mb-3">
                  Look like you're lost
                </h3>

                <p className="text-gray-600 mb-6">
                  The page you are looking for is not available!
                </p>

                <a
                  href="/"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
