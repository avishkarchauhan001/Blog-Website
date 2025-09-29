Blog Web Application
A simple blog web application built with Node.js, Express.js, and EJS that allows users to create, read, update, and delete blog posts. Data is stored in memory (no database required), making it ideal for development and learning purposes.

Features
Post Creation: Create new blog posts with a title and content.

Post Viewing: Homepage lists all posts with titles, dates, and excerpts; individual post views with full content.

Post Editing and Deletion: Edit or delete existing posts.

Responsive Design: Mobile-first UI that adapts to tablets and desktops.

Error Handling: Basic form validation and 404 page for missing routes.

Minimalist Styling: Clean, simple design inspired by essay-style pages.

Technologies Used
Node.js: Server runtime.

Express.js: Web framework for routing and middleware.

EJS: Templating engine for dynamic HTML views.

CSS: Custom responsive styling with Flexbox.

Other Dependencies: body-parser, method-override, nodemon (for development).

Installation & Setup
Extract the Project: Unzip the blog-app-complete.zip file to your desired directory.

Navigate to the Directory: Open a terminal and run cd blog-app.

Install Dependencies: Run npm install to install all required packages.

Start the Server:

For development (with auto-restart): npm run dev

For production: npm start

Access the App: Open a browser and visit http://localhost:3000.

The app includes sample posts for immediate testing.

Usage
Creating a Post
Navigate to /create.

Fill in the title and content fields.

Click "Create Post" to save and redirect to the homepage.

Viewing Posts
Homepage (/): Lists all posts.

Individual post: Click a post title or visit /posts/:id.

Editing a Post
From a post view, click "Edit Post".

Update the title/content and click "Update Post".

Deleting a Post
From a post view, click "Delete Post" and confirm.

Posts are stored in memory, so data resets on server restart.

Project Structure
text
blog-app/
├── app.js              # Main Express server and routes
├── package.json        # Dependencies and scripts
├── README.md           # This file
├── setup.sh            # Optional setup script
├── .gitignore          # Git ignore rules
├── public/             # Static assets
│   └── style.css       # Custom CSS
└── views/              # EJS templates
    ├── partials/
    │   ├── header.ejs  # Header with navigation
    │   └── footer.ejs  # Footer with scripts
    ├── index.ejs       # Homepage
    ├── create.ejs      # Create form
    ├── edit.ejs        # Edit form
    ├── post.ejs        # Single post view
    └── 404.ejs         # Error page
Routes Overview
GET /: List all posts.

GET /create: Create post form.

POST /posts: Create new post.

GET /posts/:id: View post.

GET /posts/:id/edit: Edit post form.

PUT /posts/:id: Update post.

DELETE /posts/:id: Delete post.
