import PostMessage from '../models/postMessage.js'

import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        //save - save changes made to an instance of a model of a schema
        //Models are fancy constructors compiled from Schema definitions. 
        //An instance of a model is called a document. 
        //Models are responsible for creating and reading documents from the underlying MongoDB database.
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

//request goes to /posts/123 {id}

export const updatePost = async (req,res) => {
    //rename id to _id
    const { id: _id } = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)){
        console.log('no post with that id')
        return res.status(404).send('No Post with that id')
    }
    //updated post

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true })
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)){
        console.log('no post with that id')
        return res.status(404).send('No Post with that id')
    }

    const deletedPost = await PostMessage.findByIdAndRemove(_id);
    res.json({message:'post deleted'})
}

export const likePost = async (req,res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)){
        console.log('no post with that id')
        return res.status(404).send('No Post with that id')
    }
    const post = await PostMessage.findById(_id)
    const likedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, {new: true})
    res.json(likedPost)
}