const express = require('express');
const { handleGetAllUser, handleCreateUser, getUserById, updateUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.route('')
.get(handleGetAllUser)
.post(handleCreateUser);

router.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;
