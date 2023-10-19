export default function MyPage() {
  return (
    <div className="contents-wrapper main my-page">
      <h2 className="my-page-title">회원정보 수정</h2>
      <table className="my-page-table">
        <tbody>
          <tr>
            <td>아이디(이메일)</td>
            <td>test</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>test</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>010-1234-5678</td>
          </tr>
          <tr>
            <td>비밀번호 변경</td>
            <td>
              <div className="change-password-wrapper">
                <div className="now-password">
                  <p>현재비밀번호</p>
                  <input type="password" />
                </div>
                <div className="new-password">
                  <p>새비밀번호</p>
                  <input type="password" />
                </div>
                <div className="new-password-confirm">
                  <p>비밀번호확인</p>
                  <input type="password" />
                </div>
                <input
                  type="button"
                  value="비밀번호변경"
                  className="btn-style"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>전역 설정</td>
            <td>
              <div className="settings-wrapper">
                <div className="noise-type">
                  <p>소음 종류 : </p>
                  <select name="noiseType" id="noiseType">
                    <option selected>기본</option>
                    <option>길거리</option>
                    <option>식당</option>
                    <option>와글와글</option>
                  </select>
                </div>
                <div className="play-speed">
                  <p>재생 속도 : </p>
                  <select name="playSpeed" id="playSpeed">
                    <option>느리게</option>
                    <option>조금 느리게</option>
                    <option selected>보통</option>
                    <option>조금 빠르게</option>
                    <option>빠르게</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>CDKey 만료일</td>
            <td>2099.12.31</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
