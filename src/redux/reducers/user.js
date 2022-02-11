import ConverterUtil from '../../util/converter-util'

const SIGN_IN = 'auth/SIGN_IN'
const SIGN_OUT = 'auth/SIGN_OUT'
const SET_AUTH_LOADING = 'auth/SET_AUTH_LOADING'
const GET_TOKEN = 'GET_TOKEN'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_BALANCE = 'GET_BALANCE'
const GET_USER_DETAILS = 'GET_USER_DETAILS'
const CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION'
const RECEIVE_BREADCOIN = "RECEIVE_BREADCOIN"
const SET_CONFIRM_REGISTRATION_ERROR = 'SET_CONFIRM_REGISTRATION_ERROR'
const CONFIRM_CODE = 'CONFIRM_CODE'
const AUTHORIZE_USER = 'AUTHORIZE_USER'

const initState = {
  userData: {},
  userDetails: {},
  // token: {},
  isAuthenticated: false,
  isAuthenticating: false,
  transactions: [],
  balance: [],

  confirmationDetails: {},
  confirmRegistrationError: {},
  isConfirmRegistrationSuccess: false,

  receiveBreadcoinDetails: {}
}

export default function reducer(state = initState, action) {
  const { type, payload } = action

  const cases = {
    [GET_TOKEN]: () => {
      return ({
        ...state,
        // token: payload,
      })
    },

    [GET_TRANSACTIONS]: () => ({
      ...state,
      transactions: payload,
    }),

    [GET_BALANCE]: () => ({
      ...state,
      balance: payload,
    }),

    [SIGN_OUT]: () => ({
      ...state,
      userData: {},
      isAuthenticated: false,
    }),

    [GET_USER_DETAILS]: () => ({
      ...state,
      userDetails: payload,
    }),

    // user for confirming code on registration too
    [SIGN_IN]: () => ({
      ...state,
      userData: payload,
      isAuthenticated: true,
    }),

    [SET_AUTH_LOADING]: () => ({
      ...initState,
      isAuthenticating: payload,
    }),

    [CONFIRM_REGISTRATION]: () => ({
      ...state,
      confirmationDetails: payload,
      isConfirmRegistrationSuccess: true,
      confirmRegistrationError: {}
    }),

    [SET_CONFIRM_REGISTRATION_ERROR]: () => ({
      ...state,
      confirmRegistrationError: payload
    }),

    [CONFIRM_CODE]: () => ({
      ...state,
      userData: payload,
      // isAuthenticated: true,
    }),

    [AUTHORIZE_USER]: () => ({
      ...state,
      isAuthenticated: true,
    }),

    [RECEIVE_BREADCOIN]: () => ({
      ...state,
      receiveBreadcoinDetails: payload,
    })
  }

  return cases[type] ? cases[type]() : state
}

//Actions
// export const signOut = () => ({ type: SIGN_OUT })
// export const isAuthenticating = (boolean) => ({
//   type: SET_AUTH_LOADING,
//   payload: boolean,
// })

export const getTokenAction = (responseJson) => ({ type: GET_TOKEN, payload: responseJson })

export const signInAction = (responseJson) => ({ type: SIGN_IN, payload: responseJson })

export const getTransactionsAction = (responseJson) => ({ type: GET_TRANSACTIONS, payload: responseJson })

export const getBalanceAction = (responseJson) => ({ type: GET_BALANCE, payload: responseJson })

export const getUserDetailsAction = (responseJson) => ({ type: GET_USER_DETAILS, payload: responseJson })

export const confirmRegistrationAction = (responseJson) => ({ type: CONFIRM_REGISTRATION, payload: responseJson })

export const setConfirmRegistrationErrorAction = (responseJson) => ({ type: SET_CONFIRM_REGISTRATION_ERROR, payload: responseJson })

export const confirmCodeAction = (responseJson) => ({ type: CONFIRM_CODE, payload: responseJson })

export const receiveBreadcoinAction = (responseJson) => ({ type: RECEIVE_BREADCOIN, payload: responseJson })

export const authorizeUserAction = () => ({ type: AUTHORIZE_USER, payload: {} })

// export function signIn(email, password) {
//   return async (dispatch) => {
//     dispatch(isAuthenticating(true))

//     try {
//       await signInWithEmail(email, password)
//       dispatch(fetchUserData())
//     } catch (error) {
//       console.error(error)
//     }

//     dispatch(isAuthenticating(false))
//   }
// }

// export function signUp(email, password) {
//   return async (dispatch) => {
//     dispatch(isAuthenticating(true))

//     try {
//       await signUpWithEmail(email, password)
//       const { user } = await createNewUser(email)
//       await sendEmailVerifictaion()
//       dispatch(signInAction(user))
//     } catch (error) {
//       console.error(error)
//     }

//     dispatch(isAuthenticating(false))
//   }
// }

// export function fetchUserData() {
//   return async (dispatch) => {
//     try {
//       const { user } = await getUserData()
//       dispatch(signInAction(user))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }


// export function getToken() {
//   return async (dispatch) => {
//     console.log("&77777")
//     const response = await fetch('https://api.breadcoin.pl/api/Authorization/authenticate', {
//       method: 'POST',
//       body: JSON.stringify({ username: 'testowanie', password: 'testowanie' }),
//       headers: { 'Content-Type': 'application/json'},
//     });
//     const token = await response.json();
//     console.log(token)
//     dispatch(getTokenAction(token))
//     }
// }

export function signIn(username, password, token) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://api.breadcoin.pl/api/User/LogIn', {
        method: 'POST',
        body: JSON.stringify({
          login: username,
          password: password
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // TODO: appropriate error handling required
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        dispatch(signInAction(jsonResponse));
      }
    } catch (error) {
      console.log("Login credentials are incorrect")
    }
  }
}

export function signUp(userInfo) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://api.breadcoin.pl/api/User', {
        method: 'POST',
        body: JSON.stringify({
          ...userInfo
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      // TODO: proper try catch error handling required
      if (response.ok) {
        dispatch(confirmRegistrationAction(jsonResponse))
      } else {
        // TODO: Error should be set in catch block
        console.log(jsonResponse)
        dispatch(setConfirmRegistrationErrorAction(jsonResponse))
        // throw new Error('Authentication error')
      }
    } catch (error) {
      throw error;
    }
  }
}

export function confirmRegistrationCode(confirmationDetails) {
  const { confirmationCode, id: userId } = confirmationDetails;
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.breadcoin.pl/api/User/${userId}/confirmation`, {
        method: 'POST',
        body: JSON.stringify({
          id: userId,
          confirmationCode: confirmationCode
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      dispatch(confirmCodeAction(jsonResponse))
      // dispatch(confirmRegistrationAction(jsonResponse))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export function authorizeUser() {
  return async (dispatch) => {
    console.log("Happened")
    dispatch(authorizeUserAction())
  }
}

export function getTransactions(userData) {
  const { jwtToken, id: userId } = userData;
  console.log(jwtToken);
  console.log(userId);
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.breadcoin.pl/api/Transaction/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
      });
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      dispatch(getTransactionsAction(jsonResponse))
    } catch (error) {
      console.log(error)
    }

  }
}

export function getBalance(userData) {
  const { jwtToken, id: userId } = userData;
  return async (dispatch) => {
    const response = await fetch(`https://api.breadcoin.pl/api/User/${userId}/points`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    dispatch(getBalanceAction(jsonResponse))
  }
}

export function getUserDetails(userData) {
  const { jwtToken, id: userId } = userData;
  return async (dispatch) => {
    const response = await fetch(`https://api.breadcoin.pl/api/User/GetById/${parseInt(userId)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    dispatch(getUserDetailsAction(jsonResponse))
  }
}

export function sendBreadcoin(userData, breadcoinSendDetails) {
  const { jwtToken, id: userId } = userData;
  const { companyName, realCurrency } = breadcoinSendDetails;
  const companyId = ConverterUtil.convertCompanyNameToId(companyName);
  console.log(companyName);
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.breadcoin.pl/api/Transfer/send`, {
        method: 'POST',
        body: JSON.stringify({
          senderId: userId,
          realCurrency: parseInt(realCurrency),
          companyId
        }),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
      })
      console.log(response)
      // const jsonResponse = await response.json();
      // dispatch(confirmRegistrationAction(jsonResponse))
    } catch (error) {
      console.log(error)
    }
  }
}

export function receiveBreadcoin(userData, breadcoinReceiveDetails) {
  const { jwtToken, id: userId } = userData;
  const { companyName, breadcoinTransferCode: code } = breadcoinReceiveDetails;
  const companyId = ConverterUtil.convertCompanyNameToId(companyName);
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.breadcoin.pl/api/Transfer/receive`, {
        method: 'POST',
        body: JSON.stringify({
          receiverId: userId,
          code,
          companyId
        }),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
      })
      // TODO: appropriate error handling required
      if (response.ok) {
        const jsonResponse = await response.json();
        dispatch(receiveBreadcoinAction(jsonResponse))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

  // export function approveBreadcoin(userData, approveBreadcoinDetails) {
  //   const { jwtToken, id: userId } = userData;
  //   const { companyName, realCurrency, transferId } = approveBreadcoinDetails;

  //   const companyId = ConverterUtil.convertCompanyNameToId(companyName);
  //   return async (dispatch) => {
  //     try {
  //       const response = await fetch(`https://api.breadcoin.pl/api/transfer/${transferId}/approve`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           receiverId: userId,
  //           code,
  //           companyId
  //         }),
  //         headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${jwtToken}`},
  //       })
  //       // TODO: appropriate error handling required
  //       if(response.ok) {
  //         const jsonResponse = await response.json();
  //         dispatch(receiveBreadcoinAction(jsonResponse))
  //       }
  //     } catch (error){
  //       console.log(error)
  //     }
  //   }
  // }