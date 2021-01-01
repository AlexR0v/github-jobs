import React, { useState } from 'react'
import useData from './utils/useData'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Spinner } from 'react-bootstrap'
import JobCard from './components/JobCard'
import JobsPagination from './components/JobsPagination'
import SearchForm from './components/SearchForm'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const {data, loading, error, hasNextPage} = useData(params, page)

  const handleParams = (e: any) => {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevState => {
      return {...prevState, [param]: value}
    })
  }

  return (
    <Container className='my-4'>
      <h1 className='mb-4'>GitHub Jobs</h1>
      <SearchForm
        params={params}
        handleParams={handleParams}
      />
      {loading && <div className='d-flex justify-content-center align-items-center'>
        <Spinner
          animation='border'
          variant='primary'
        />
      </div>}
      {error && <h1>Some error. Try again later or refreshing the page.</h1>}
      {
        data.length !== 0 &&
        <>
          <JobsPagination
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
          {
            data.map((job: any) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))
          }
          <JobsPagination
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
        </>
      }


    </Container>
  )
}

export default App
