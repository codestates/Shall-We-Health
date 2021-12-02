module.exports = {

  verifyNickname: (nickname) => {
    // (1)글자수 제한 (2~8)  
    //(2) 한글 영어 숫자
    //(3) 특문불가
    let nickLength = 0;

    for (let i = 0; i < nickname.length; i++) { //한글은 2, 영문은 1로 치환 
      let nick = nickname.charAt(i); //입력 된 한글자 가져오기
      if (escape(nick).length > 4) { // 한글자 가져온게 한글이라면  (한글이면 length 6나옴)
        nickLength += 2;
      } else {
        nickLength += 1;
      }
    }

    console.log(nickname.length)
    if (nickLength > 3 && nickLength < 21) {
      const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]*$/;
      return regex.test(nickname)
    } else {
      return false
    }


  },

  verifyEmail: (email) => {
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/ // 최소 8자리, 숫자,문자,특수문자 최소 1개
    return regex.test(email)
  },

  verifyPassword: (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
    return regex.test(password)
  },

  signUp: () => {

  }



}

