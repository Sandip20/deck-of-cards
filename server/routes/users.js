const USER = require('../models/model_user');
const SKILLS = require('../models/model_skills');
const USER_ACTIVITY = require('../models/model_useractivity')

const router = require('express').Router();
var passport = require('passport');
var multer = require('multer')
const imagespath = "backend/images/"

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, imagespath);
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});



module.exports = (function () {


    router.get('/:username', (req, res) => {
        USER.findOne({ username: req.params.username }, { _id: 0, password: 0 }).exec((err, user) => {
            if (err)
                res.status(500).send({message:`${err.message}`});
            else
                res.status(200).json(user);
        })
    });
    router.post('/signup', (req, res, next) => {
        ///res.status(200).send(`User created successfully`);
        if (!req.body.password && req.body.password.length <= 4)
            res.status(400).send({message:'Minimum length of password should be 4'});
        else if (!req.body.username)
            res.status(400).send({message:'username is required'});
        else {
            USER.findOne({ username: req.body.username }, { _id: 0 }).exec((err, user) => {
                if (err)
                    res.status(500).send({message:`${err.message}`})
                else if (user) {
                    res.status(409).send({message:`username ${req.body.username} is already exist.`});
                }
                else {

                    var newUser = new USER();
                    newUser.username = req.body.username;
                    newUser.name = req.body.name ? req.body.name : 'unknown';
                    newUser.age = req.body.age ? req.body.age : 15;
                    newUser.password = newUser.encryptPassword(req.body.password);
                    newUser.skills = req.body.skills;
                    newUser.save(function (err, result) {
                        if (err)
                            res.status(500).send(`${err.message}`);
                        else
                            res.status(200).send({ message: 'user is created successfully.' });

                    })
                    var newactivity = new USER_ACTIVITY();
                    newactivity.username = req.body.username;
                    newactivity.save(function (err, result) {
                        if (err)
                            console.log(err);
                        else
                            console.log(result)

                    })

                }

            });
        }
    });
    router.post('/signin', passport.authenticate('local.signin'), (req, res, next) => {
        req.session.passport = req.session.passport;
        res.status(200).send({ status: 1, username: req.session.passport.user.username });
    });
    router.put('/:username', (req, res) => {
        if (req.body.username) {
            USER.findOneAndUpdate({ username: req.body.username }, req.body).exec((err, user) => {
                if (err)
                    res.status(500).send(`${err.message}`)
                else if (user) {
                    res.status(200).send({ message: 'User updated successfully' });
                }
            })
        }
        else {
            res.status(400).send({ message: 'username is required' });
        }
    });

    router.post(
        "/image/upload",
        multer({ storage: storage }).single("imagePath"),
        (req, res, next) => {
            const url = req.protocol + "://" + req.get("host");
            var data = {}
            if (req.body.type == "image1") {
                data.imagePath1 = url + '/' + imagespath + req.file.filename
            }
            else if (req.body.type == "image2") {
                data.imagePath2 = url + '/' + imagespath + req.file.filename
            }
            else {
                data.imagePath1 = '',
                    data.imagePath2 = '';
            }

            USER.findOneAndUpdate({ username: req.body.username }, data, { upsert: true }, (err, user) => {

                res.status(200).send({ url: url + '/' + imagespath + req.file.filename });
            })


        }
    );
    router.put('/profile/:username', (req, res) => {
        USER.findOneAndUpdate({ username: req.params.username }, { $set: { profileUrl: req.body.imagePath } }, (err, doc) => {
            res.status(200).send({ status: 'success' });
        })
    })
    router.delete('/profile/:username/:url', (req, res) => {
        var data = {}
        if (parseInt(req.params.url) == 1) {
            data.imagePath1 = ''
        } else {
            data.imagePath2 = ''
        }
        USER.findOneAndUpdate({ username: req.params.username }, data, (err, doc) => {
            res.status(200).send({ status: 'success' });
        })
    })
    router.get('/profile/:username', (req, res) => {
        USER.findOne({ username: req.params.username }, { profileUrl: 1, _id: 0 }, (err, doc) => {
            res.status(200).json(doc);
        })
    })
    router.get('/all/skills', (req, res) => {
        SKILLS.find({}, { _id: 0 }).lean().exec((err, data) => {
            res.status(200).json(...data);
        })
    })

    return router;
})();