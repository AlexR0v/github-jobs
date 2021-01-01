import { Pagination } from 'react-bootstrap'

const JobsPagination = ({page, setPage, hasNextPage}: any) => {
  const updatePage = (amount: number) => {
    setPage((prevPage: number) => prevPage + amount)
  }
  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => updatePage(-1)} />}
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && <Pagination.Item onClick={() => updatePage(-1)}>{page - 1}</Pagination.Item>}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => updatePage(1)}>{page + 1}</Pagination.Item>}
      {hasNextPage && <Pagination.Next onClick={() => updatePage(1)} />}
    </Pagination>
  )
}

export default JobsPagination
