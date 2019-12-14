import CallAPI from '../../until/apiCaller'

export const getall = (data) =>{
    return {
      type: 'GET_ALL_ACTIVITIES',
      data
    }
}

export const getAllActivities = (page) => {
    return dispatch => {
      return CallAPI(`activities/getAllActivities/${page}`,
      'GET',
      {},
      'token'
      ).then(repsone => {
            dispatch(getall(repsone.data))
      }).catch(err => {
        console.log(err)
      })
    }
  }