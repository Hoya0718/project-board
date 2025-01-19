document.addEventListener('DOMContentLoaded', () => {
    // 함수들을 밖으로 이동
    function updateLayoutBoard(html) {
        const layoutBoard = document.getElementById('layout-board');
        console.log('layoutBoard 엘리먼트 존재여부:', !!layoutBoard);
        console.log('받은 HTML:', html);

        if (layoutBoard) {
            layoutBoard.innerHTML = html;
            console.log('HTML 업데이트 완료');
        } else {
            console.error('layoutBoard 엘리먼트를 찾을 수 없습니다');
        }
        initializeCKEditor();
    }

    function initializeCKEditor() {
        if (CKEDITOR.instances.bo_content) {
            CKEDITOR.instances.bo_content.destroy();
        }
        CKEDITOR.replace('bo_content');
    }

    const observer = new MutationObserver(async () => {
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.addEventListener('click', async function () {
                // CKEditor 내용 가져오기
                const content = CKEDITOR.instances.bo_content ? CKEDITOR.instances.bo_content.getData() : '';

                // FormData 객체 생성
                const formData = new FormData();
                formData.append('title', document.getElementById('title').value);
                formData.append('content', content);
                formData.append('post', document.getElementById('post').value);
                formData.append('user_id', document.getElementById('user_id').value);
                formData.append('board_id', document.getElementById('board_id').value);

                try {
                    console.log('폼 데이터:', Object.fromEntries(formData));

                    const response = await fetch('/twrite', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const html = await response.text();
                    console.log('서버에서 받은 HTML:', html);
                    updateLayoutBoard(html);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            // 이벤트 리스너가 추가된 후 observer 중단
            observer.disconnect();
        }
    });

    // DOM의 변화를 감지하도록 설정
    observer.observe(document.body, { childList: true, subtree: true });
});