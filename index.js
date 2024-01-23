import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [
  { id: 1, title: 'First Post', content: 'Change the content of this post.' }
];


app.get('/', (req, res) => {
  res.render('home', { posts });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = posts.findIndex((p) => p.id === postId);
  posts[index] = { id: postId, title, content };
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
