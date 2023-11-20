// const express = require('express')
// const mongoose = require('mongoose')
// const articleRouter = require('./routes/articles')

import express from 'express'
import mongoose from 'mongoose'
import Article from './models/article.js'
import articleRouter from './routes/articles.js'
import methodOveride from 'method-override'



const app = express()
const uri = 'mongodb+srv://tarun:tarun@sukuna23.d2flflr.mongodb.net/?retryWrites=true&w=majority'



const PORT = process.env.PORT || 8080;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      // User.insertMany(users);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOveride('_method'))





app.get('/', async (req, res) => {

    const articles = await Article.find().sort({ createdAt: 'desc' }) 

    
    res.render('articles/index',{ articles: articles })
} )

app.use('/articles', articleRouter)


app.listen(5000)