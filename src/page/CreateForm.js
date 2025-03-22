import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { createForm } from "../service/oprations/formApi";
import toast from "react-hot-toast";

// Utility to generate a unique ID (for demonstration purposes)
const generateId = () => Math.random().toString(36).substr(2, 9);

const CreateForm = () => {
  // Local state for form title and dynamic fields (excluding title)
  const [formTitle, setFormTitle] = useState("Job Application");
  // Toggle for showing input type buttons
  const [showInputOptions, setShowInputOptions] = useState(false);
  // Array to hold dynamically added fields (title is managed separately)
  const [fields, setFields] = useState([]);

  // Handler for title input changes
  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  // Add a new field based on the type (only non-title fields)
  const handleAddInput = (type) => {
    const newField = {
      id: generateId(),
      type: type.toLowerCase(),
      label: `${type}`,
      value: "",
      isEditing: false,
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  // Toggle input type buttons visibility
  const handleToggleInputOptions = () => {
    setShowInputOptions(!showInputOptions);
  };

  // Delete a field
  const handleDeleteField = (fieldId) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  // Update a field value in the left builder
  const handleFieldChange = (fieldId, newValue) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, value: newValue } : field
      )
    );
  };

// Final create form button: builds a payload and calls createForm API
const handleCreateForm = async () => {
  // Build payload with a nested "fields" array
  const dataToCreate = { title: formTitle };
  fields.forEach((field) => {
    if (field.label.toLowerCase() !== "title") {
      dataToCreate[field.label.toLowerCase()] = field.value;
    }
  });

  try {
    const response = await createForm(dataToCreate);
    console.log("Form created:", response);
    toast.success("Form Created")
    
  } catch (error) {
    console.error("Error creating form:", error);
    toast.error("Fail to create form")
  }
};



  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">Create New Form</h1>

      {/* Main Container: Two Columns */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left Column: Form Builder */}
        <div className="w-full md:w-2/3 bg-white rounded shadow p-6">
          {/* Form Title Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">{formTitle}</h2>
            </div>
          </div>

          {/* Title Input */}
          <label className="block mb-2 text-gray-700 font-medium">
            Title
            <input
              type="text"
              value={formTitle}
              onChange={handleTitleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </label>

          {/* Render existing dynamic fields */}
          <div className="space-y-4 mb-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between border border-gray-200 rounded p-3"
              >
                <div className="flex flex-col w-2/3">
                  {/* Display field name as static text */}
                  <span className="font-medium text-gray-700">{field.label}</span>
                  {/* Field Value Input */}
                  <input
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    value={field.value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="mt-2 border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <FaTrash
                  className="text-red-500 ml-3 cursor-pointer"
                  onClick={() => handleDeleteField(field.id)}
                />
              </div>
            ))}
          </div>

          {/* Toggle Button for Input Options */}
          <button
            onClick={handleToggleInputOptions}
            className="bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300 mb-4"
          >
            {showInputOptions ? "CLOSE ADD INPUT" : "ADD INPUT"}
          </button>

          {/* Conditionally Render Input Type Buttons */}
          {showInputOptions && (
            <div className="flex flex-wrap gap-2 mb-4">
              {["TEXT", "NUMBER", "EMAIL", "PASSWORD", "DATE"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleAddInput(type)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Create Form Button */}
          <button
            onClick={handleCreateForm}
            className="bg-green-500 ml-3 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            CREATE FORM
          </button>
        </div>

        {/* Right Column: Form Editor Preview */}
        <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Form Editor</h3>
          {/* Preview the Form Title */}
          <p className="text-gray-700 mb-4 font-semibold">{formTitle}</p>
          {/* Render each added field as a read-only preview */}
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                placeholder={`Enter ${field.label}`}
                value={field.value}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
