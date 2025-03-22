import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById } from "../service/oprations/formApi";

const ViewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await getFormById(id);
        if (response?.data?.data) {
          let data = response.data.data;
          // If data is an array, find the form with matching id.
          if (Array.isArray(data)) {
            data = data.find((form) => form._id === id || form.id === id);
          }
          setFormData(data);
        } else {
          console.error("No form found or error in response");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">Form not found.</p>
      </div>
    );
  }

  // Prepare an array of fields excluding the title
  const otherFields = [];
  if (formData.email) {
    otherFields.push(<Field key="email" label="Email" value={formData.email} />);
  }
  if (formData.password) {
    otherFields.push(
      <Field key="password" label="Password" value={formData.password} />
    );
  }
  if (formData.text) {
    otherFields.push(<Field key="text" label="Text" value={formData.text} />);
  }
  if (formData.date) {
    otherFields.push(<Field key="date" label="Date" value={formData.date} />);
  }
  if (formData.number) {
    otherFields.push(
      <Field key="number" label="Number" value={formData.number} />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {formData.title}
        </h1>
        <div className="space-y-4">
          {otherFields.length > 0 ? (
            otherFields
          ) : (
            <p className="text-gray-700 text-lg">No other data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="p-4 bg-gray-50 border rounded-lg">
    <p className="text-gray-600 font-medium">{label}:</p>
    <p className="text-gray-800 font-semibold text-lg">{value}</p>
  </div>
);

export default ViewForm;
