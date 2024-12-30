document.addEventListener('DOMContentLoaded', function() {
    // 로그인 폼 제출 처리
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // 기본 폼 동작 방지

            const name = document.getElementById('name').value.trim();
            const account = document.getElementById('account').value.trim();
            const combo = document.getElementById('combo').value;
            const checkbox = document.getElementById('agree'); // 체크박스
            const checkboxError = document.getElementById('checkbox-error'); // 에러 메시지

            // 체크박스가 클릭되지 않은 경우
            if (!checkbox.checked) {
                checkboxError.style.display = 'block'; // 에러 메시지 표시
                return; // 폼 제출을 막음
            } else {
                checkboxError.style.display = 'none'; // 체크박스가 선택되면 에러 메시지 숨김
            }

            // 모든 입력 값이 올바른지 확인
            if (name && account && combo) {
                // 폼 처리 로직 (data.json을 가져와서 사용자 확인)
                fetch('data.json')
                    .then(response => response.json())
                    .then(data => {
                        const user = data.users.find(user => user.name === name && user.account === account && user.combo === combo);
                        if (user) {
                            const userData = { name, account, combo };
                            const encodedData = encodeBase64(JSON.stringify(userData));
                            window.location.href = `account.html?data=${encodeURIComponent(encodedData)}`;
                        } else {
                            showErrorMessage("주주 정보가 일치하지 않습니다.");
                        }
                    })
                    .catch(error => {
                        showErrorMessage("데이터를 불러오는 데 문제가 발생했습니다.");
                        console.error(error);
                    });
            } else {
                showErrorMessage("모든 정보를 올바르게 입력해 주세요.");
            }
        });
    }

    // 오류 메시지 표시 함수
    function showErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
            errorMessage.style.display = "block";
        }
    }

    // Base64 UTF-8 인코딩 함수
    function encodeBase64(input) {
        return btoa(unescape(encodeURIComponent(input)));
    }

    // 로고 스타일 변경
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        console.log('로고 컨테이너가 존재합니다.');

        // 스크롤 이벤트 처리
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            console.log('스크롤 위치:', scrollPosition); // 스크롤 위치 출력

            if (scrollPosition > 0) {
                logoContainer.classList.add('white-background');
                logoContainer.classList.remove('transparent');
            } else {
                logoContainer.classList.remove('white-background');
                logoContainer.classList.add('transparent');
            }
        });
    } else {
        console.log('로고 컨테이너를 찾을 수 없습니다.');
    }

    // 슬라이더 관련 코드
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');

    let currentIndex = 0;

    // 슬라이드 위치 업데이트 함수
    function updateSliderPosition() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // 슬라이드 이동
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? sliderItems.length - 1 : currentIndex - 1;
        updateSliderPosition();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex === sliderItems.length - 1) ? 0 : currentIndex + 1;
        updateSliderPosition();
    });

    // 첫 번째 슬라이드가 기본으로 보이게 함
    updateSliderPosition();
});

document.addEventListener('DOMContentLoaded', function() {
    // 로컬 스토리지에서 팝업을 숨겼는지 확인
    const popupShown = localStorage.getItem('popupShown');

    // 팝업을 보여줄지 여부 판단
    if (!popupShown) {
        // 팝업을 표시
        const popup = document.getElementById('popup');
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
    }

    // 닫기 텍스트 클릭 시
    const closePopup = document.getElementById('close-popup');
    closePopup.addEventListener('click', function() {
        const dontShowAgain = document.getElementById('dont-show-again').checked;

        if (dontShowAgain) {
            // "오늘 하루동안 안 보기" 체크 시 로컬 스토리지에 상태 저장
            localStorage.setItem('popupShown', 'true');
        }

        // 팝업 숨기기
        const popup = document.getElementById('popup');
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
});

