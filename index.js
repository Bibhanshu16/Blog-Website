import express from "express";
import bodyparser from "body-parser";

import {dirname, parse} from "path";
import { fileURLToPath } from "url";
import { title } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));
    

const app = express();
const port = 3000;

let blogPostsArray = [];


import { v4 as uuidv4 } from "uuid";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));




app.get("/", (req, res) => {
    res.render("index.ejs", {posts: blogPostsArray});
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/home", (req, res) => {
    res.render("index.ejs", { posts: blogPostsArray }); 
  });

app.post("/submit", (req, res) => {
    const {blogTitle, blogCategory, blogBlog } = req.body;

    blogPostsArray.push({
        id: uuidv4(),
        title: blogTitle,
        category: blogCategory,
        blog: blogBlog
    });
    res.redirect("/");
});


app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;

    blogPostsArray = blogPostsArray.filter(post => post.id !== postId);

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = blogPostsArray.find(p => p.id === postId);
  
    if (post) {
      res.render("edit", { post });
    } else {
      res.status(404).send("Post not found");
    }
  });
  


app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const { blogTitle, blogCategory, blogBlog } = req.body;
  
    const postIndex = blogPostsArray.findIndex(p => p.id === postId);
  
    if (postIndex !== -1) {
      blogPostsArray[postIndex].title = blogTitle;
      blogPostsArray[postIndex].category = blogCategory;
      blogPostsArray[postIndex].blog = blogBlog;
    }
  
    res.redirect("/");
  });


app.get("/blog", (req, res) => {
  res.send("Pages are not created for this..(If you git this project you can create pages for this)");
});
  



app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});