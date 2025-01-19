document.addEventListener("DOMContentLoaded", () => {
    const layoutBoard = document.getElementById('layout-board');
    if (!layoutBoard) {
        console.error('layout-board element not found');
    }

    // 게시글 내용 불러오기
    const loadPostContent = async (id) => {
        try {
            const response = await fetch(`/post/view/rest/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();

            // layoutBoard가 동적으로 추가될 수 있으므로 이 시점에서 확인하고 설정
            const layoutBoard = document.getElementById('layout-board');
            if (!layoutBoard) {
                console.error('layout-board element not found during content load');
                return;
            }
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

    // 클릭 이벤트 처리
    document.addEventListener("click", async (event) => {
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

        if (event.target.id === 'write-button') {
            const formData = new FormData();
            formData.append('post', document.getElementById('post').value);
            try {
                const params = new URLSearchParams();
                params.append('post', document.getElementById('post').value);

                const response = await fetch(`/test1?${params.toString()}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();

                // layoutBoard가 동적으로 추가될 수 있으므로 이 시점에서 확인하고 설정
                const layoutBoard = document.getElementById('layout-board');
                if (!layoutBoard) {
                    console.error('layout-board element not found during content load');
                    return;
                }
                layoutBoard.innerHTML = html;

                // CKEditor 초기화
                initCKEditor();
                console.log("글쓰기 완료");
            } catch (error) {
                console.error("글쓰기 중 오류 발생:", error);
            }
        }
    });

    // 뒤로 가기 및 앞으로 가기 버튼 처리
    window.addEventListener("popstate", (event) => {
        if (event.state?.id) {
            loadPostContent(event.state.id);
        }
    });

    // layout-board가 동적으로 추가되는 경우를 감지하여 처리
    const observer = new MutationObserver(() => {
        const layoutBoard = document.getElementById('layout-board');
        if (layoutBoard) {
            observer.disconnect();  // layout-board가 추가되었으므로 더 이상 감지하지 않음
            console.log('layout-board element added');
        }
    });

    // DOM 변화 감지 (childList: 자식 요소가 추가되거나 삭제되는 경우)
    observer.observe(document.body, {childList: true, subtree: true});
});
