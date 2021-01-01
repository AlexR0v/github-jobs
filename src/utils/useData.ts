import { useEffect, useReducer } from 'react'
import axios from 'axios'

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR'
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

    default:
      return state
  }

}

const useData = (params: object, page: number) => {
  const [state, dispatch] = useReducer(reducer, {data: [], loading: true})

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
    return () => {
      cancelToken.cancel()
    }
  }, [params, page, url])

  return state
}

export default useData
