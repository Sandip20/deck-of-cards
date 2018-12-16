const CARD = require('../models/model_card');
const USER_ACTIVITY = require('../models/model_useractivity');
const router = require('express').Router();

module.exports = (function () {
    router.post('/', (req, res) => {
        var records = req.body;
        //seed data to the db
        CARD.insertMany(records, function (err, doc) {
            console.log(err)
            console.log(doc)
        })
    })
    router.get('/:username', (req, res) => {

        CARD.find({}, { _id: 0 }).lean().exec((err, docs) => {
            if (err)
                res.status(500).send(`${err.message}`);
            else {
                res.status(200).send(docs);
                var data = { $set: { diamonds: [], hearts: [], spades: [], clubs: [] } }
                USER_ACTIVITY.findOneAndUpdate({ username: req.params.username }, data, { upsert: true }).exec();
            }

        })

    })

    router.put('/user-activity/:username/:type', (req, res) => {
        var data = {};
        if (req.params.type == 'spades') {
            data['$push'] = { spades: req.body }
        }
        else if (req.params.type == 'hearts') {
            data['$push'] = { hearts: req.body }
        }
        else if (req.params.type == 'diamonds') {
            data['$push'] = { diamonds: req.body }
        }
        else if (req.params.type == 'clubs') {
            data['$push'] = { clubs: req.body }
        }

        USER_ACTIVITY.findOneAndUpdate({ username: req.params.username }, data, { upsert: true }).exec((err, doc) => {
            if (err)
                res.status(500).send(`${err.message}`);
            else
                res.status(200).send(doc);
        })

    })
    router.get('/user-activity/:username', (req, res) => {

        CARD.find({}, { _id: 0 }).lean().exec().then((docs) => {
            USER_ACTIVITY.findOne({ username: req.params.username }, { _id: 0 }).exec((err, doc) => {
                if (err)
                    res.status(500).send(`${err.message}`);
                else if (doc) {
                    var totalcards = [].concat(...doc.spades, ...doc.hearts, ...doc.clubs, ...doc.diamonds)
                    var arr = [];
                    if (totalcards.length != 0) {
                        docs.forEach(function (item) {
                            var i = 0;
                            for (; i < totalcards.length; i++) {
                                if (item.displayName == totalcards[i].displayName) {
                                    break;
                                }
                            }
                            if (i == totalcards.length) {
                                arr.push(item);
                            }

                        })

                    }
                    else{
                        arr=docs;
                    }
                    res.status(200).send({ ritems: arr, rSpades: doc.spades, rClubs: doc.clubs, rDiamonds: doc.diamonds, rHearts: doc.hearts });

                }
                else {
                    //res.status(200).send(docs);
                    res.status(200).send({ ritems: docs, rSpades: [], rClubs: [], rDiamonds: [], rHearts: []});
                }

            })
        },
            (err) => {
                if (err)
                    res.status(500).send(`${err.message}`);
            })


    })
    return router;

})();