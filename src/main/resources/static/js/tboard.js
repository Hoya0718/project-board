document.addEventListener("DOMContentLoaded", () => {
    const layoutBoard = document.getElementById('layout-board');

    // 게시판 컨텐츠 로드 함수
    const loadBoardContent = (boardType) => {
        fetch(`/layout/board/rest/${boardType}`)
            .then(res => res.text())
            .then(html => {
                layoutBoard.innerHTML = html;
                // 컨텐츠 로드 후 버튼 이벤트 다시 등록
                attachButtonEvents();
            })
            .catch(error => console.error('Error: ', error));
    };

    // 버튼 이벤트 등록 함수
    const attachButtonEvents = () => {
        document.querySelectorAll(".board-button").forEach(button => {
            button.addEventListener("click", handleButtonClick);
        });
    };

    // 버튼 클릭 핸들러
    const handleButtonClick = (event) => {
        const boardType = event.target.dataset.board;
        console.log(boardType);

        history.pushState({boardType: boardType}, '', `/board/${boardType}`);
        loadBoardContent(boardType);
    };

    // 초기 버튼 이벤트 등록
    attachButtonEvents();

    // 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.boardType) {
            loadBoardContent(event.state.boardType);
        } else {
            fetch('/layout/board/rest/main')
                .then(res => res.text())
                .then(html => {
                    layoutBoard.innerHTML = html;
                    // 메인 페이지로 돌아왔을 때도 버튼 이벤트 다시 등록
                    attachButtonEvents();
                });
        }
    });
});