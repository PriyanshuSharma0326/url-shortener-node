const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("signup", {
                error: "All fields are required",
            });
        }
        if (name.length < 3) {
            return res.status(400).render("signup", {
                error: "Name must be at least 3 characters long",
            });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).render("signup", {
                error: "Invalid email format",
            });
        }
        if (password.length < 6) {
            return res.status(400).render("signup", {
                error: "Password must be at least 6 characters long",
            });
        }

        const existingUser = await User.findOne({
            email: email,
        });

        if (existingUser) {
            return res.status(409).render("signup", {
                error: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = setUser(user);
        res.cookie('uid', token);
        return res.redirect("/");
    }
    catch (error) {
        console.error(error);

        return res.status(500).render("signup", {
            error: "Internal Server Error",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render('login', {
            error: 'All fields are required',
        });
    }

    const user = await User.findOne({
        email: email,
        password: password,
    });

    if(!user) {
        return res.status(404).render('login', { error: "Invalid username or password" });
    }

    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}
