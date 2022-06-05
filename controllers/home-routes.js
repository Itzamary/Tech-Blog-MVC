const router = require('express').Router();
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        console.log(dbPostData, 'dbpostdata');
        console.log(dbPostData.username)
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
      if (req.session.loggedIn) {
          res.redirect('/');
          return;
      }
      res.render('login');
  });


  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



  router.get('/edit/:id', withAuth, (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      },
      attributes:[
        'id',
        'comment_text',
        'created_at'
      ], 
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({message: 'no post found with this id'});
        return;
      }
        const comment = dbCommentData.get({plain: true});
        res.render('edit-comments', {
          comment, 
          loggedIn: true
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })

module.exports = router;