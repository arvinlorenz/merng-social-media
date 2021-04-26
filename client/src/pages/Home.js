import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY)

  if (error) {
    console.log(error)
    return 'error' // blocks rendering
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading && <h1>Loading...</h1>}
        {data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  )
}

export default Home
