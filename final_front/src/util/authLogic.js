import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { memberListDB } from "../axios/member/memberCrud";

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
export const loginH = (user) => {
  return memberListDB(user)
    .then((response) => {
      const result = response.data;
      const isValidUser = result.some((member) => {
        return member.mem_id === user.id && member.mem_pw === user.password;
      });
      if (isValidUser) {
        // 유저 정보가 유효한 경우 로그인 성공
        const userCredential = { user: { id: user.id } };
        return Promise.resolve(userCredential);
      } else {
        // 유저 정보가 유효하지 않은 경우 로그인 실패
        const errorMessage = "로그인에 실패하였습니다";
        return Promise.reject(errorMessage);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
/* export const loginH = (user) => { // user = onAuthChange = (auth)의 auth와 동일
  console.log(user.id + user.password)
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(user.id, user.password)
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
} */

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

export const sendResetpwEmail = (auth, email) => {
  console.log(email)
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      resolve('비밀번호 변경 이메일을 전송합니다')
    })
    .catch((e) => reject(e))
  })
}

export default AuthLogic;