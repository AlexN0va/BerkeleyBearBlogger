import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var blogPosts = [];

class Blog {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }
  }

app.get(("/"), (req, res)=>{
    res.render("index.ejs");
})

app.get(("/post"), (req, res)=>{
    res.render("post.ejs", { listOfBlogs: blogPosts});
})

app.post("/submit", (req,res)=>{
    var newPost = new Blog(req.body["blogTopic"], req.body["blogDescription"]);
    blogPosts.push(newPost);

    res.render("post.ejs", {title: newPost.title, content: newPost.content, listOfBlogs: blogPosts, });
})

app.get('/edit/:id', (req, res) => {
    const blogId = req.params.id; // Get the index from the URL
    console.log(blogId);
    const post = blogPosts[blogId]; // Retrieve the specific blog post using the index
    console.log(post);
    console.log(blogPosts[blogId]);

    
    res.render('edit.ejs', { post, blogId }); // Pass the blog post and index to the edit page

});

app.post('/edit/:id', (req, res)=>{
    console.log(blogPosts[req.params.id].title);
    blogPosts[req.params.id].title =  req.body["newBlogTopic"];
    blogPosts[req.params.id].content =  req.body["newBlogDescription"];

    res.redirect("/post");
})

app.listen(port, ()=>{
    console.log("Server running on port 3000")
});