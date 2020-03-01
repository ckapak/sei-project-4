import Auth from '../lib/auth'
import Cookies from 'js-cookie'

export const getHeaders = () => {

  let result = {}

  const csrftoken = Cookies.get('csrftoken')
  if (csrftoken) {
    result['X-CSRF-TOKEN'] = csrftoken
  }

  const authToken = Auth.getToken()
  if (authToken) {
    result['Authorization'] = `Bearer ${authToken}` 
  }

  return result;
}


// // import Auth from '../lib/auth'
// import Cookies from 'js-cookie'
// const csrftoken = Cookies.get('csrftoken')


// export const headers = {
//   common: {
//     'X-CSRF-TOKEN': csrftoken
//   },
//   // // // <!-- later on you can include this (remember to import it): -->
//   // headers: { Authorization: `Bearer ${Auth.getToken()}` }
// }