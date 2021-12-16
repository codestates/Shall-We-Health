module.exports = {

  verifyNickname: (nickname) => {
    let nickLength = 0;

    for (let i = 0; i < nickname.length; i++) {
      let nick = nickname.charAt(i);
      if (escape(nick).length > 4) {
        nickLength += 2;
      } else {
        nickLength += 1;
      }
    }

    if (nickLength > 3 && nickLength < 21) {
      const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]*$/;
      return regex.test(nickname)
    } else {
      return false
    }


  },

  verifyEmail: (email) => {
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;  // eslint-disable-line
    return regex.test(email)
  },

  verifyPassword: (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
    return regex.test(password)
  },

}

