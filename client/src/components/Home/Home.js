import React, {useState, useEffect} from 'react'
import {Container, Grow, Grid} from '@material-ui/core'
import useStyles from './styles'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

const Home = () => {
      //React hooks -> might cause Prop drilling, which can be solved by redux
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();

    //since we gotta share id between 2 components post and form, with plain React
    //whenever things changes in the list -> callback runs
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])
    return (
        <Grow in>
            <Container>
            <Grid className={classes.mainContainer} container direction = "column-reverse" justify = "space-between" alignItems = "stretch" spacing = {3}>
                <Grid item xs={12} sm={6}>
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Form currentId = {currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
            </Container>

        </Grow>
    )
}

export default Home