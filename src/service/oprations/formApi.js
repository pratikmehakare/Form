import { apiConnector } from "../apiConnector";
import { endPoints } from "../api";

const { GET_FORM_BY_ID_API, GET_ALL_FORM_API, CREATE_FORM_API, DELETE_FORM_API, UPDATE_FORM_API } = endPoints;

// Fetch all forms
export async function getAllForm() {
    try {
        console.log("api",GET_ALL_FORM_API)
        const res = await apiConnector("GET", GET_ALL_FORM_API);
        console.log("GET_ALL_FORM_API RESPONSE",res)
        return res;
    } catch (error) {
        console.error("GET_ALL_FORM_API ERROR.....", error);
        return null;
    }
}

// Fetch form by id
export async function getFormById(id) {
    try {
        console.log("api",GET_FORM_BY_ID_API)
        const res = await apiConnector("GET", GET_FORM_BY_ID_API,id);
        console.log("GET_FORM_BY_ID_API RESPONSE",res)
        return res;
    } catch (error) {
        console.error("GET_FORM_BY_ID_API ERROR.....", error);
        return null;
    }
}

// Create a new form
export async function createForm(formData) {
    try {
        const res = await apiConnector("POST", CREATE_FORM_API, formData);
        console.log("CREATE_FORM_API RESPONSE",res)
        return res;
    } catch (error) {
        console.error("CREATE_FORM_API ERROR.....", error);
        return null;
    }
}

// Update an existing form
export async function updateForm(id, updatedData) {
    try {
        const res = await apiConnector("PUT", `${UPDATE_FORM_API}/${id}`, updatedData);
        console.log("UPDATE_FORM_API RESPONSE",res)
        return res;
    } catch (error) {
        console.error("UPDATE_FORM_API ERROR.....", error);
        return null;
    }
}

// Delete a form
export async function deleteForm(id) {
    try {
        console.log("api", DELETE_FORM_API)
        const res = await apiConnector("DELETE", `${DELETE_FORM_API}/${id}`);
        console.log("DELETE_FORM_API RESPONSE",res)
        return res;
    } catch (error) {
        console.error("DELETE_FORM_API ERROR.....", error);
        return null;
    }
}
