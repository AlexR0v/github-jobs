import React, { useState } from 'react'
import useData from './utils/useData'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Spinner } from 'react-bootstrap'
import JobCard from './components/JobCard'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const {data, loading, error} = useData(params, page)

  return (
    <Container>
      {loading && <Spinner
        animation='border'
        variant='primary'
      />}
      {error && <h1>Some error. Try again later or refreshing the page.</h1>}
      {
        data.map((job: any)=>(
          <JobCard key={job.id} job={job}/>
        ))
      }
    </Container>
  )
}

export default App
