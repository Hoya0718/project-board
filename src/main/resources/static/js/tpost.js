document.addEventListener("DOMContentLoaded", () => {
    const layoutBoard = document.getElementById('layout-board');

    // 버튼 클릭 이벤트 위임 처리
    layoutBoard.addEventListener("click", (event) => {
        const target = event.target;

        // 수정 버튼 클릭 이벤트 처리
        if (target.id === "modifyButton") {
            const id = target.getAttribute("data-id");

            // 수정 요청
            fetch(`/post/modify/rest/${id}`, {
                method: "GET", // 수정은 GET 요청
            })
                .then(res => res.text())
                .then(html => {
                    updateLayoutBoard(html); // 레이아웃 업데이트 후 CKEditor 초기화
                })
                .catch(error => console.error('Error:', error));
        }

        // 삭제 버튼 클릭 이벤트 처리
        if (target.id === "deleteButton") {
            const id = target.getAttribute("data-id");
            if (confirm("정말로 삭제하시겠습니까?")) {

                // 삭제 요청
                fetch(`/post/delete/rest/${id}`, {
                    method: "DELETE", // 삭제는 DELETE 요청
                })
                    .then(res => res.text())
                    .then(html => {
                        updateLayoutBoard(html); // 레이아웃 업데이트 후 CKEditor 초기화
                    })
                    .catch(error => console.error('Error:', error));
            }
        }
    });

    // 브라우저 history API를 통한 상태 관리
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("tposts-button")) {
            const id = event.target.dataset.id; // 버튼의 data-id 속성 사용
            history.pushState({ id: id }, '', `/layout/view/rest/${id}`); // 상태 업데이트
        }
    });

    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.id) {
            loadPostContent(event.state.id); // 상태가 있을 경우 해당 콘텐츠 로드
        }
    });

    // 포스트 콘텐츠 로드 함수
    function loadPostContent(id) {
        fetch(`/post/content/rest/${id}`) // 서버에서 포스트 콘텐츠 가져오기
            .then(res => res.text())
            .then(html => {
                updateLayoutBoard(html); // 콘텐츠 업데이트 후 CKEditor 초기화
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // 레이아웃 업데이트 및 CKEditor 초기화
    function updateLayoutBoard(html) {
        layoutBoard.innerHTML = html; // 새로운 콘텐츠로 갱신
        initializeCKEditor(); // CKEditor 초기화
    }

    // CKEditor 초기화 함수
    function initializeCKEditor() {
        const contentArea = document.getElementById('bo_content');
        if (contentArea) {
            CKEDITOR.replace('bo_content', {
                height: 500,
                filebrowserUploadUrl: '/adm/fileupload.do', // 파일 업로드 URL
                toolbar: [
                    ['Font', 'FontSize'],
                    ['Bold', 'Italic', 'Underline', 'Strike'],
                    ['TextColor', 'BGColor'],
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['NumberedList', 'BulletedList'],
                    ['Image', 'Table'],
                    ['Source']
                ],
                removeButtons: 'Subscript,Superscript'
            });
        }
    }
});