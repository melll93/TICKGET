import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, EmailAuthProvider } from "firebase/auth";

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

export const linkEmail = (auth, user) => {
  console.log(auth);
  console.log(auth.currentUser);
  console.log(user);
  return new Promise((resolve, reject) => {
    console.log(user.email + "," + user.password);
    const credential = EmailAuthProvider.credential(user.email, user.password);
    console.log(credential);
    console.log(auth.currentUser.uid);
    resolve(auth.currentUser.uid);
    /* 인증정보가 다른 사용자 계정에 이미 연결되어 있다면 아래 코드 에러 발생함
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        console.log(usercred);
        const user = usercred.user;
        console.log("Account linking success", user.uid);
        resolve(user.uid);
      })
      .catch((e) => reject(e));
    */
  });
};

export const signupEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        sendEmail(userCredential.user).then(() => {
          resolve(userCredential.user.uid);
        });
      })
      .catch((e) => reject(e));
  });
};

export const sendEmail = (user) => {
  return new Promise((resolve, reject) => {
    sendEmailVerification(user)
      .then(() => {
        resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
      })
      .catch((e) => reject(e + ": 인증 메일 오류입니다."));
  });
};

export default AuthLogic;