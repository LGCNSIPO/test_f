(async function () {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (!encodedData) {
        alert("잘못된 접근입니다!");
        window.location.href = "index.html";
        return;
    }

    try {
        // Base64 UTF-8 디코딩
        const decodedData = JSON.parse(decodeBase64(encodedData));
        const { name, account } = decodedData;

        // data.json에서 사용자 정보 확인
        const response = await fetch('data.json');
        const data = await response.json();

        const user = data.users.find(user => user.name === name && user.account === account);

        if (!user) {
            alert("사용자 정보를 찾을 수 없습니다.");
            window.location.href = "index.html";
            return;
        }

                // 로그인 유저의 이름 출력
                document.getElementById("welcome-user").textContent = user.name;

        // 계정 정보 표시
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-account").textContent = user.account;
        document.getElementById("user-combo").textContent = user.combo;  // 콤보 추가
        document.getElementById("stock-price").textContent = user.stockPrice.toLocaleString();
        document.getElementById("shares-owned").textContent = user.sharesOwned.toLocaleString();

        const evaluatedAmount = user.stockPrice * user.sharesOwned;
        document.getElementById("evaluated-amount").textContent = evaluatedAmount.toLocaleString();
    } catch (error) {
        alert("데이터를 처리하는 중 문제가 발생했습니다.");
        window.location.href = "index.html";
        console.error(error);
    }
})();

// Base64 UTF-8 디코딩 함수
function decodeBase64(input) {
    return decodeURIComponent(escape(atob(input)));
}

// 현재 날짜를 표시하는 함수
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date(); // 현재 날짜와 시간
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // 형식 지정
    const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
    dateElement.textContent = `본 데이터는 ${formattedDate} 기준입니다.`;
}

// 페이지 로드 시 날짜 표시
window.onload = displayCurrentDate;

document.addEventListener('DOMContentLoaded', function() {
    // 로딩 화면 숨기기 및 콘텐츠 표시
    setTimeout(function() {
        // 로딩 화면 애니메이션 숨기기
        document.getElementById('loading-screen').style.opacity = 0;

        // 로딩 화면이 완전히 사라지면 콘텐츠 표시
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none'; // 완전히 숨기기
            document.getElementById('content').classList.remove('hidden'); // 콘텐츠 표시
        }, 1000); // 1초 후에 로딩 화면을 숨깁니다.
    }, 1000); // 1초 동안 로딩 화면을 표시
});