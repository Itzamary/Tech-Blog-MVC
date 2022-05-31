const router = require('express').Router();
const {Comment} = require('../../models');

//Get all comment route
router.get('/', (req ,res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err, 'error1');
        res.status(500).json(err);
    });
});

// Post a new comment route
router.post('/', (req, res) =>{
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>  {
        console.log(err, 'error2');
        res.status(500).json(err);
    });
});

// delete a comment route
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({message: 'No comment with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err, 'error3');
        res.status(500).json(err);
    });
});

module.exports = router;