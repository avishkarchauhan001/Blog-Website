const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
// Production-specific middleware
app.use(require('compression')());
app.use(require('helmet')());
}



app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [ 
{
id: 1,
title: "Welcome to My Blog",
content: "This is my first blog post. I'm excited to start sharing my thoughts",
dateCreated: new Date('2024-09-28'),
excerpt: "This is my first blog post. I'm excited to start sharing..."
}
];

let nextId = 2;

function generateExcerpt(content, maxLength = 100) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
}



// HOME PAGE - Display all posts
app.get('/', (req, res) => {
    const sortedPosts = posts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    res.render('index', { posts: sortedPosts });
});

// CREATE - Show create form
app.get('/create', (req, res) => {
    res.render('create');
});

// CREATE - Handle form submission
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    
    // Basic validation
    if (!title || !content) {
        return res.render('create', { 
            error: 'Both title and content are required.',
            title: title || '',
            content: content || ''
        });
    }

    const newPost = {
        id: nextId++,
        title: title.trim(),
        content: content.trim(),
        dateCreated: new Date(),
        excerpt: generateExcerpt(content.trim())
    };

    posts.push(newPost);
    res.redirect('/');
});

// READ - Show single post
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).render('404');
    }
    
    res.render('post', { post });
});

// UPDATE - Show edit form
app.get('/posts/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).render('404');
    }
    
    res.render('edit', { post });
});

// UPDATE - Handle form submission
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
        return res.status(404).render('404');
    }

    // Basic validation
    if (!title || !content) {
        const post = posts[postIndex];
        return res.render('edit', { 
            post,
            error: 'Both title and content are required.'
        });
    }

    // Update the post
    posts[postIndex] = {
        ...posts[postIndex],
        title: title.trim(),
        content: content.trim(),
        excerpt: generateExcerpt(content.trim())
    };

    res.redirect(`/posts/${postId}`);
});

// DELETE - Remove post
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
        return res.status(404).render('404');
    }
    
    posts.splice(postIndex, 1);
    res.redirect('/');
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});