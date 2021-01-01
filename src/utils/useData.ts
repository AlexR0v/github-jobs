import { useEffect, useReducer } from 'react'
import axios from 'axios'

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
  HAS_NEXT_PAGE: 'HAS_NEXT_PAGE'
}

const initialState = {
  data: [],
  loading: true,
  error: false,
  hasNextPage: true
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        data: []
      }
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      }
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.error
      }
    case ACTIONS.HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage
      }

    default:
      return state
  }

}

const useData = (params: object, page: number) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const url: string = (process.env.REACT_APP_REQ_URL as string)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    dispatch({type: ACTIONS.MAKE_REQUEST})
    axios.get(url, {
      cancelToken: cancelToken.token,
      params: {markdown: true, page: page, ...params}
    }).then(res => {
      dispatch({type: ACTIONS.GET_DATA, payload: {data: res.data}})
    }).catch(e => {
      if (axios.isCancel(e)) return
      dispatch({type: ACTIONS.ERROR, payload: {error: e}})
    })

    const cancelToken2 = axios.CancelToken.source()
    axios.get(url, {
      cancelToken: cancelToken2.token,
      params: {markdown: true, page: page + 1, ...params}
    }).then(res => {
      dispatch({type: ACTIONS.HAS_NEXT_PAGE, payload: {hasNextPage: res.data.length !== 0}})
    }).catch(e => {
      if (axios.isCancel(e)) return
      dispatch({type: ACTIONS.ERROR, payload: {error: e}})
    })
    return () => {
      cancelToken.cancel()
      cancelToken2.cancel()
    }
  }, [params, page, url])

  return state
}

export default useData
