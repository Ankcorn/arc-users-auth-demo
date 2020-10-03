import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export const userPool =  new CognitoUserPool({ UserPoolId: 'eu-west-1_Mo7jjzwz0', ClientId: '2qfk2m3ubcrjq4ghrqb519op44'});

export function signUp(username, password) {
  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, null, null, (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}

export function confirmSignUp(username, code) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        resolve(result);
    });
  });
}

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (user) => {
        resolve(user)
      },
      onFailure: (e) => {
        reject(e)
      }
    });
  });
}

export function getToken() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if(!cognitoUser) {
      reject({ error: 'no authenticated user' })
    }
    cognitoUser.getSession(function(err, session) {
      if (err) {
          reject(err);
      }
      resolve(session);
    });
  });
}

export default {}
