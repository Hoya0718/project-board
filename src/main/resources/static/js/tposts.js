document.addEventListener("DOMContentLoaded", () => {
    const layoutBoard = document.getElementById('layout-board');
    if (!layoutBoard) {
        console.error('layout-board element not found');
        return;
    }

    const loadPostContent = async (id) => {
        try {
            const response = await fetch(`/post/view/rest/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            layoutBoard.innerHTML = html;

            // CKEditor 초기화
            initCKEditor();
        } catch (error) {
            console.error('게시글 로드 중 오류 발생:', error);
            layoutBoard.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
        }
    };

    // CKEditor 초기화 함수
    const initCKEditor = () => {
        const editorElement = document.getElementById('bo_content');
        if (editorElement) {
            if (CKEDITOR.instances['bo_content']) {
                CKEDITOR.instances['bo_content'].destroy();
            }
            CKEDITOR.replace('bo_content', {
                height: 500,
                filebrowserUploadUrl: '/adm/fileupload.do',
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
    };

    // 클릭 이벤트 하나로 통합
    document.addEventListener("click", async (event) => {
        // 게시글 버튼 클릭 처리
        const postButton = event.target.closest('.tposts-button');
        if (postButton) {
            const id = postButton.dataset.tposts;
            if (!id) {
                console.error('게시글 ID가 없습니다');
                return;
            }
            history.pushState({id}, '', `layout/board/rest/${id}`);
            loadPostContent(id);
            return;
        }

        // 글쓰기 버튼 클릭 처리
        if (event.target.id === 'write-button') {
            const formData = new FormData();
            formData.append('post', document.getElementById('post').value); //작성 제목
            try {
                const params = new URLSearchParams();
                params.append('post', document.getElementById('post').value); // 쿼리 문자열로 보냄

                const response = await fetch(`/test1?${params.toString()}`, {
                    method: 'GET',  // GET 요청으로 보내는 방식
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                layoutBoard.innerHTML = html;

                // CKEditor 초기화
                initCKEditor();

                console.log("글쓰기 완료");
            } catch (error) {
                console.error("글쓰기 중 오류 발생:", error);
            }
        }
    });

    window.addEventListener("popstate", (event) => {
        if (event.state?.id) {
            loadPostContent(event.state.id);
        }
    });
});