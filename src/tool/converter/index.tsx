import {
    DocumentTextIcon,
    DocumentArrowDownIcon,
    ArrowPathIcon,
    ArrowsPointingInIcon,
  } from "@heroicons/react/24/outline"; // Heroicons
  import React from "react";
  
  const QuickActions = () => {
    const actions = [
      { title: "Convert PDF to Word", icon: <DocumentTextIcon />, color: "bg-blue-100 text-blue-600" },
      { title: "Convert Word to PDF", icon: <DocumentArrowDownIcon />, color: "bg-pink-100 text-pink-600" },
      { title: "Compress PDF", icon: <ArrowPathIcon />, color: "bg-yellow-100 text-yellow-600" },
      { title: "Split PDF", icon: <ArrowsPointingInIcon />, color: "bg-red-100 text-red-600" },
      // Add more actions here
    ];
  
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mr-4`}
              >
                {React.cloneElement(action.icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuickActions;
  