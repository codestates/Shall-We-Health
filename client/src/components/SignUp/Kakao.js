import axios from "axios"

function KakaoLoginClickHandler() {

  const { Kakao } = window // 카카오 관련 method 사용가능하게(index.html head부분에도 추가된 부분있음)
  Kakao.Auth.login({
    scope: 'profile_nickname, account_email',
    success: (authObj) => {
      console.log('1/액세스토큰')

      Kakao.API.request({
        url: '/v2/user/me',
        data: {
          property_keys: ["kakao_account.email", "kakao_account.profile.nickname"]
        },

        success: async function (res) {
          console.log('2/회원정보')

          const email = res.kakao_account.email
          const nickname = res.kakao_account.profile.nickname
          const isOauth = 1

          await axios.post(`${process.env.REACT_APP_SERVER_API}/users/kakao`,
            { email, nickname, isOauth },
            { withCredentials: true })
            .then((res) => {
              console.log('3')


              if (res.status === 201) {

                KakaoLoginClickHandler()
              } else {
                /* 로그인 */
                axios.post(`${process.env.REACT_APP_SERVER_API}/users/kakao`, { email })
                  .then((res) => {
                    console.log(res, 'kakao/response/if/201/login')
                  })
                window.location.reload('/')
              }
            })
            .catch((err) => {
              console.log(err)
            })

        }
      }
      )
    }
  })
}

export default KakaoLoginClickHandler