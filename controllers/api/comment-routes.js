const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

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
router.post('/', withAuth, (req, res) =>{

    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => {
        console.log(dbCommentData, 'comment data from new comment')
        res.json(dbCommentData)
    })
    .catch(err =>  {
        console.log(err, 'error2');
        res.status(500).json(err);
    }); 
    }
});


// Put route for updating a post
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err, 'error4');
        res.status(500).json(err);
    });
});


// delete a comment route
router.delete('/:id', withAuth, (req, res) => {
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