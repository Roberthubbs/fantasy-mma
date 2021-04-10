const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Player } = require("../models");

router.post('/register', async (req, res) => {


    const { username, password  } = req.body
    console.log('Made into register')
    
    const hash = bcrypt.hashSync(password, 10);
    console.log(username);
    console.log(password);
    if (username && password) try {
        let newObj = { username: username, password: hash, waiverLeft: 200, pointTotal: 0 }
        let user = await Player.create(
            newObj
        );
        let data = await user.authorize();
        user.save();

        return res.json(data);
    } catch (err) {


        return res.status(400).send(['That Username Is Already Taken']);
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;

    let ret;
    if (!username) {
        return res.status(400).send(
            ['Request missing username or password param']
        );
    }

    try {


        let user = await Player.authenticate(username, password)
        return res.json(user)

    } catch (err) {
        return res.status(400).send(['invalid username or password']);
    }




});

router.delete('/logout', async (req, res) => {



    const { user } = req.body

    const authToken = req.body.user.password


    if (user && authToken) {
        await Player.prototype.logout(authToken);
        return res.status(204).send()
    }

    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );
});

router.get('/me', (req, res) => {
    if (req.user) {
        return res.send(req.user);
    }
    res.status(404).send(
        { errors: [{ message: 'missing auth token' }] }
    );
});

// router.get('/user/:id', async (req, res) => {


//     let id = req.params.id;
//     if (!id) {
//         return res.status(400).send("Log in to view user information")
//     }
//     let user = await User.findOne({ where: { id: id }, raw: true })
//     let comments = await Comment.findAll({ where: { author_id: id }, raw: true });
//     return Promise.all(comments.map(async (comment) => {
//         article = await Article.findOne({ where: { id: comment.post_id }, raw: true });
//         comment.title = article.title;
//         comment.url = article.url;
//         return comment

//     })).then((result) => {
//         res.send({ comments: result, user: user })
//     });

// })

module.exports = router;