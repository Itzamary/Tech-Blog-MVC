const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

//Get all Post
router.get('/', (req, res) => {
    console.log('============');
    Post.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err, 'error1');
        res.status(500).json(err);
    });
});


//Get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include :[
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err, 'error2');
        res.status(500).json(err);
    });
});


//Post route for creating a new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err, 'error3');
        res.status(500).json(err);
    });
});


// Put route for updating a post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
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


//Delete routes
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err, 'error5');
        res.status(500).json(err);
    });
});

module.exports = router;