const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
  res.render('index', { title: 'Welcome to share' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/feed',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  console.log(req.body, " <- logout req.body")
  req.logout();
  res.redirect('/');
});

module.exports = router;
