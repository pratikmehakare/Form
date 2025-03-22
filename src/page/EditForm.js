import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById, updateForm } from "../service/oprations/formApi";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const generateId = () => Math.random().toString(36).substr(2, 9);

const EditForm = () => {
  const { id } = useParams(); // form id from URL

  // Form title state (separate state for easier editing)
  const [formTitle, setFormTitle] = useState("Edit Form");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Toggle for showing input type buttons
  const [showInputOptions, setShowInputOptions] = useState(false);

  // Fields array: start with only the Title field by default.
  // The title field is kept in both formTitle and within the fields array.
  const [fields, setFields] = useState([
    {
      id: generateId(),
      label: "Title",
      type: "text",
      value: "",
      isEditing: false,
    },
  ]);

  // Fetch the form data on mount and populate state
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await getFormById(id);
        if (response.data.data) {
          let data = response.data.data;
          // If data is an array, find the form with matching id.
          if (Array.isArray(data)) {
            data = data.find((form) => form._id === id || form.id === id);
          }
          if (data) {
            // Set title both in the separate state and in the fields array
            const loadedTitle = data.title || "Edit Form";
            setFormTitle(loadedTitle);
            const loadedFields = [
              {
                id: generateId(),
                label: "Title",
                type: "text",
                value: loadedTitle,
                isEditing: false,
              },
            ];
            if (data.email) {
              loadedFields.push({
                id: generateId(),
                label: "Email",
                type: "email",
                value: data.email,
                isEditing: false,
              });
            }
            if (data.text) {
              loadedFields.push({
                id: generateId(),
                label: "Text",
                type: "text",
                value: data.text,
                isEditing: false,
              });
            }
            if (data.password) {
              loadedFields.push({
                id: generateId(),
                label: "Password",
                type: "password",
                value: data.password,
                isEditing: false,
              });
            }
            if (data.date) {
              loadedFields.push({
                id: generateId(),
                label: "Date",
                type: "date",
                value: data.date,
                isEditing: false,
              });
            }
            if (data.number) {
              loadedFields.push({
                id: generateId(),
                label: "Number",
                type: "number",
                value: data.number,
                isEditing: false,
              });
            }
            setFields(loadedFields);
          } else {
            console.error("No form with the given id found");
          }
        } else {
          console.error("No form found or error in response");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    

    fetchFormData();
  }, [id]);

  // Save edited title on blur; also update the Title field in fields array
  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.label.toLowerCase() === "title" ? { ...field, value: formTitle } : field
      )
    );
  };

  // Save edited field label (on blur)
  const handleSaveFieldLabel = (fieldId) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, isEditing: false } : field
      )
    );
  };

  // Update field label or value
  const handleFieldChange = (fieldId, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, [key]: value } : field
      )
    );
    // If updating the title field, also update formTitle state
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.label.toLowerCase() === "title" && key === "value") {
      setFormTitle(value);
    }
  };

  // Delete a field (do not allow deletion of Title)
  const handleDeleteField = (fieldId, fieldLabel) => {
    if (fieldLabel.toLowerCase() === "title") return;
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  // Toggle the input type buttons visibility
  const handleToggleInputOptions = () => {
    setShowInputOptions(!showInputOptions);
  };

  // Add a new field (TEXT, EMAIL, NUMBER, DATE)
  const handleAddInput = (type) => {
    const newField = {
      id: generateId(),
      label: `New ${type}`,
      type: type.toLowerCase(),
      value: "",
      isEditing: false,
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  // Save the form by calling updateForm from API service
  const handleSaveForm = async () => {
    // Build the data object from current state.
    // Use formTitle for the title and then map other fields by their label (lowercased) to their value.
    const dataToUpdate = { title: formTitle };
    fields.forEach((field) => {
      if (field.label.toLowerCase() !== "title") {
        dataToUpdate[field.label.toLowerCase()] = field.value;
      }
    });
    try {
      const response = await updateForm(id, dataToUpdate);
      console.log("Form updated:", response);
      toast.success("Form Updated")
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("Error updating form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">Edit Form</h1>

      {/* Main Container: Two Columns */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left Column: Form Builder */}
        <div className="w-full md:w-2/3 bg-white rounded shadow p-6">
          {/* Form Title Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                  className="text-xl font-semibold border-b-2 border-blue-300 focus:outline-none"
                  autoFocus
                />
              ) : (
                <h2 className="text-xl font-semibold">{formTitle}</h2>
              )}
              {/* (Optional: Edit icon for title can be added here) */}
            </div>
          </div>

          {/* Existing Fields List */}
          <div className="space-y-4 mb-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between border border-gray-200 rounded p-3"
              >
                <div className="flex flex-col w-2/3">
                  {field.isEditing ? (
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(field.id, "label", e.target.value)
                      }
                      onBlur={() => handleSaveFieldLabel(field.id)}
                      className="font-medium border-b-2 border-blue-300 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="font-medium">{field.label}</span>
                    </div>
                  )}
                  {/* Value Editing */}
                  <input
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, "value", e.target.value)
                    }
                    className="mt-2 border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                {/* Delete Field Icon (do not allow deletion of Title) */}
                {field.label.toLowerCase() !== "title" && (
                  <FaTrash
                    className="text-red-500 ml-3 cursor-pointer"
                    onClick={() => handleDeleteField(field.id, field.label)}
                  />
                )}
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
              {["TEXT", "EMAIL", "NUMBER", "DATE"].map((type) => (
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

          {/* SAVE FORM Button */}
          <button
            onClick={handleSaveForm}
            className="bg-green-500 text-white py-2 ml-3 px-4 rounded hover:bg-green-600"
          >
            SAVE FORM
          </button>
        </div>

        {/* Right Column: Form Editor Preview */}
        <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Form Editor</h3>
          {/* Preview the Form Title */}
          <p className="text-gray-700 mb-4 font-semibold">{formTitle}</p>
          {/* Render each field as a read-only preview */}
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                placeholder={`Enter ${field.label}`}
                value={field.value}
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
