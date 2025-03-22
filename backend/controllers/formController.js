const Form = require("../models/form");

// Get all forms
exports.getAllForm = async (req, res) => {
    try {
        const formData = await Form.find();
        if (!formData.length) {  
            return res.status(404).json({
                success: false,
                message: "No forms found."
            });
        }

        return res.status(200).json({
            success: true,
            data: formData
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        });
    }
};

// Get forms by id
exports.getFormById = async (req, res) => {
    try {
        const {id} = req.params;
        const formData = await Form.findById(id);
        if (!formData) {  
            return res.status(404).json({
                success: false,
                message: "No form found."
            });
        }

        return res.status(200).json({
            success: true,
            formData
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        });
    }
};

// Create a form
exports.createForm = async (req, res) => {
    try {
        const { title, email, password, date, number, text } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required."
            });
        }

        const newForm = new Form({ title, email, password, date, number, text });

        await newForm.save();

        return res.status(201).json({ 
            success: true,
            message: "Form created successfully",
            data: newForm
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        });
    }
};

//edit 
exports.editForm = async (req,res) =>{
    try{
        const {id} = req.params;
        const updateData = req.body;

        const updatedFormData = await Form.findByIdAndUpdate(id,updateData,{ new: true, runValidators: true });

        if(!updatedFormData){
            return res.status(404).json({
                success:false,
                message:"Form not found"
            })
        }
        
        return res.status(200).json({
            success: true,
            message: "Form updated successfully",
            data: updatedFormData
        });


    }catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        });
    }
}

// delete
exports.deleteForm = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedForm = await Form.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Form deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        });
    }
};