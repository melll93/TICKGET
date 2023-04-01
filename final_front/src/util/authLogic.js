import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

class AuthLogic {
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
  }

  getUserAuth = () => {
    return this.auth;
  };

  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };
}

export const onAuthChange = (auth) => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  }); // end of Promise
}; // end of onAuthChange

export const login = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        resolve(user);
      })
      .catch((e) => reject(e));
  });
};

export const logout = (auth) => {
  return new Promise((resolve, reject) => {
    auth.signOut().catch((e) => reject(e + "로그아웃 오류"));
    sessionStorage.clear();
    resolve();
  });
};
// 자체 로그인 처리 
export const loginH = (auth, user) => { // user = onAuthChange = (auth)의 auth와 동일
  console.log(auth)
  console.log(user.id + user.password)
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, user.id, user.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    resolve(userCredential)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + ", " + errorMessage)
    reject(error)
  });
  })
}

export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user; //구글에 등록되어 있는 profile 정보가 담겨 있음
        console.log(user);
        resolve(user);
      })
      .catch((e) => reject(e));
  });
};

export default AuthLogic;