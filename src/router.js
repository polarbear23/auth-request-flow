const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === mockUser.username) {
        if (password === mockUser.password) {
            const payload = { username: mockUser.username }
            const token = jwt.sign(payload, "bob");
            return res.json({ data: token });
        }
    }
    return res.status(400).send({
        message: 'username or password incorrect!'
    });

});

router.get('/profile', (req, res) => {
    console.log(req.headers.authentication);
    try {
        jwt.verify(req.headers.authentication, "bob")
        return res.json(mockUser.profile);
    }
    catch {
        return res.json("invalid token");
    }
});

module.exports = router;
