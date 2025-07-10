export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            TravelBuilder
          </h1>
          <p className="text-xl text-gray-600">
            Create stunning travel websites with our drag-and-drop editor
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Drag-and-drop editor
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Travel-themed blocks
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Live preview
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Responsive design
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  Export functionality
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Travel website preview"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Build Professional Travel Websites
                </h3>
                <p className="text-gray-600">
                  Create beautiful, responsive websites for travel agencies,
                  tour operators, and destinations.
                </p>
              </div>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
