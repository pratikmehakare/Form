import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllForm, deleteForm } from "../service/oprations/formApi";
import toast from "react-hot-toast";

const Home = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getAllForm();
        if (response && response.data && response.data.data) {
          setForms(response.data.data);
        } else {
          console.error("No forms found or error in response");
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();

  }, []);

  const handleCreateForm = () => {
    navigate('/form/create')
  };

  const handleEdit = (formId) => {

    navigate(`/form/edit/${formId}`);
  };

  const handleView = (formId) => {
    navigate(`/form/${formId}`);
  };

  const handleDelete = async (formId) => {
    try {
      await deleteForm(formId);
      setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
      toast.success("Deleted")
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Fail to delete")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Form.com</h1>
        <p className="text-gray-600 mb-4">This is a simple form builder</p>
        <button
          onClick={handleCreateForm}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          CREATE NEW FORM
        </button>
      </header>

      {/* Divider */}
      <div className="w-4/5 mx-auto border-b-2 border-gray-300 my-5" />

      {/* Forms Section */}
      <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Forms</h2>
        {forms.length > 0 ? (
          <div className="space-y-4">
            {forms.map((form) => (
              <div
                key={form._id}
                className="p-4 border border-gray-200 rounded shadow flex items-center justify-between"
              >
                <h3 className="text-xl font-medium">{form.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(form._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleView(form._id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            You have no forms created yet.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
