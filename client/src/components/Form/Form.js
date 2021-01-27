import React, { useState,useEffect } from 'react'


import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import useStyles from './styles'


import { useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

import { useDispatch } from 'react-redux'
const Form = ({ currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const user = JSON.parse(localStorage.getItem('profile'))

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    //callback function and dependency array, when post changes -> use callback function
    useEffect(() => {if (post) setPostData(post)}, [post])

    const dispatch = useDispatch()

    const classes = useStyles();

    const handleSubmit = (event) => {
        console.log("form submitted")
        event.preventDefault(); //prevent browser refresh
        if(currentId){
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}))
        }
        clear();
        //if you want to trace dispatch 
        //here -> actions -> reducers.posts -> reducers.index -> "redux store" in src/index.js 
        //in addition, to connect with backend
        //here -> actions -> api -> backend
    }

    if (!user?.result?.name){
        return(
            <Paper className = {classes.paper}>
                <Typography variant = "h6" align="center"> Please sign in to create a post </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''})
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h6">
                        {currentId ? 'Editing' : 'Creating'} a Memory
                    </Typography>
                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={postData.title}
                        onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                    />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        value={postData.message}
                        onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                    />
                    <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })}
                    />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                        Clear
                    </Button>
                </form >

            </Paper>
        </div>
    )
}

export default Form