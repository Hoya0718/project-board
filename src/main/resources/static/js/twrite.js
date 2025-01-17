document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(async () => {
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.addEventListener('click', async function () {
                // CKEditor 내용 가져오기
                const content = CKEDITOR.instances.bo_content ? CKEDITOR.instances.bo_content.getData() : '';

                // FormData 객체 생성
                const formData = new FormData();
                formData.append('title', document.getElementById('title').value); //작성 제목
                formData.append('content', content); //내용
                formData.append('post', document.getElementById('post').value); //게시판인지 이름
                formData.append('user_id', document.getElementById('user_id').value); //사용자가 누구인지
                formData.append('board_id', document.getElementById('board_id').value); //게시판 번호

                try {
                    console.log(formData)

                    const response = await fetch('/twrite', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    // 서버에서 HTML 응답을 받음
                    const html = await response.text(); // HTML 형식 응답을 텍스트로 받음
                    updateLayoutBoard(html); // 레이아웃 업데이트 후 CKEditor 초기화
                }

                catch (error) {
                    console.error('Error:', error);
                }
            });

            // observer를 멈춥니다.
            observer.disconnect();
        }
    });

    // 레이아웃 업데이트 및 CKEditor 초기화
    function updateLayoutBoard(html) {
        const layoutBoard = document.getElementById('layoutBoard');
        if (layoutBoard) {
            layoutBoard.innerHTML = html; // 새로운 콘텐츠로 갱신
        }
        initializeCKEditor(); // CKEditor 초기화
    }

    // CKEditor 초기화 함수
    function initializeCKEditor() {
        if (CKEDITOR.instances.bo_content) {
            CKEDITOR.instances.bo_content.destroy(); // 기존 CKEditor 인스턴스를 파괴
        }
        CKEDITOR.replace('bo_content'); // CKEditor 새로 초기화
    }

    // DOM의 변화를 감지하도록 설정
    observer.observe(document.body, { childList: true, subtree: true });
});
