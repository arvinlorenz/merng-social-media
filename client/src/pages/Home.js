import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`
function Home() {
  const { loading, data, error } = useQuery(FETCH_POST_QUERY)

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
