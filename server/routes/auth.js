const router = require('express').Router();

router.get('/', (req, res) => {
res.status(200).send(req.session.passport.user?true:false);
})
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send(true);
    })
module.exports=router;