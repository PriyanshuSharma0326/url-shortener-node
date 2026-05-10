const User = require("../models/user");

async function handleGetAllUser(req, res) {
    console.log('dvsd ');
    const users = await User.find({});
    res.status(200).json(users);
}

async function handleCreateUser(req, res) {
    const body = req.body;

    if(
        !body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title
    ) {
        res.status(400).json({ status: 'All form fields are required.' });
        return;
    }
    
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });

    return res.status(201).json({ message: "User created", user: result });
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Found user.", user: user });
}

async function updateUser(req, res) {
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { ...body });
    const result = await User.findById(req.params.id);
    return res.status(200).json({ status: 'User updated.', user: result });
}

async function deleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id);
    const result = await User.findById(req.params.id);
    return res.status(200).json({ status: 'Success' });
}

module.exports = {
    handleGetAllUser,
    handleCreateUser,
    getUserById,
    updateUser,
    deleteUser,
}
