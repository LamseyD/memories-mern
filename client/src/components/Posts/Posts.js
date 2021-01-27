import React from 'react'
import { useSelector } from 'react-redux'

import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'

import useStyles from './styles'

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts) //points at reducer/index.js for posts
    
    const classes = useStyles()
    console.log(posts)
    return (
        <div>
            {
                !posts.length ? <CircularProgress/> : (
                    <Grid className = {classes.container} container alignItems="stretch">
                        {   //on xsmall/mobile device it takes 12 cells
                            // on small/larger it takes 6
                            posts.map((post) => (
                                <Grid key={post._id} item xs={12} sm = {6}> 
                                    <Post post = {post} setCurrentId={setCurrentId}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                )
            }
        </div>
    )
}

export default Posts