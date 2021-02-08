const express = require('express');
const app = express();
const path = require('path');
var methodOverride = require('method-override');
const {v4: uuid} = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let blogs = [
  {
    id:uuid(),
    title: 'Why not to be a vegan!',
    username: 'Todd',
    blog: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium architecto dolorum, similique quos numquam magnam sed perspiciatis animi accusantium explicabo cum temporibus iure quis ipsa! Corporis dignissimos est quam eius, sed praesentium ipsam expedita sequi optio corrupti officia officiis aliquam ex fugit libero animi quae temporibus, ratione sit sunt rem.'
  },
  {
    id:uuid(),
    title: 'Northern lights',
    username: 'Skyler',
    blog: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium architecto dolorum, similique quos numquam magnam sed perspiciatis animi accusantium explicabo cum temporibus iure quis ipsa! Corporis dignissimos est quam eius, sed praesentium ipsam expedita sequi optio corrupti officia officiis aliquam ex fugit libero animi quae temporibus, ratione sit sunt rem.'
  },
  {
    id:uuid(),
    title: 'Tyler hero',
    username: 'Sk8erboi',
    blog: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium architecto dolorum, similique quos numquam magnam sed perspiciatis animi accusantium explicabo cum temporibus iure quis ipsa! Corporis dignissimos est quam eius, sed praesentium ipsam expedita sequi optio corrupti officia officiis aliquam ex fugit libero animi quae temporibus, ratione sit sunt rem.'
  },
  {
    id:uuid(),
    title: 'Tesla is future of cars',
    username: 'onlysayswoof',
    blog: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium architecto dolorum, similique quos numquam magnam sed perspiciatis animi accusantium explicabo cum temporibus iure quis ipsa! Corporis dignissimos est quam eius, sed praesentium ipsam expedita sequi optio corrupti officia officiis aliquam ex fugit libero animi quae temporibus, ratione sit sunt rem.'
  },
  {
    id:uuid(),
    title: 'Fuck electric future',
    username: 'dodge_owner',
    blog: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium architecto dolorum, similique quos numquam magnam sed perspiciatis animi accusantium explicabo cum temporibus iure quis ipsa! Corporis dignissimos est quam eius, sed praesentium ipsam expedita sequi optio corrupti officia officiis aliquam ex fugit libero animi quae temporibus, ratione sit sunt rem.'
  }
];



app.get('/', (req, res) => {
  res.render('index', { blogs });
})

app.get('/new', (req, res) => {
  res.render('new');
})

app.post('/', (req, res) => {
  const {title, username, blog } = req.body;
  blogs.push({title, username, id: uuid(), blog});
  res.redirect('/');
})

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const blog = blogs.find(c => c.id === id);
  res.render('show', {blog});
})

app.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const blog = blogs.find(c => c.id === id);
  res.render('edit', {blog});
})

app.patch('/:id', (req, res) => {
  const { id } = req.params;
  const newBlogText = req.body.blog;
  const foundblog = blogs.find(c => c.id === id);
  foundblog.blog = newBlogText;
  res.redirect('/');
})

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  blogs = blogs.filter(c => c.id !== id);
  res.redirect('/'); 
})

app.listen(3000, () => {
  console.log("Server is running!");
})