document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(async () => {
        const modifyButton = document.getElementById('modifyButton');
        if (modifyButton) {
            modifyButton.addEventListener('click', async function () {
                // CKEditor 내용 가져오기
                const content = CKEDITOR.instances.bo_content ? CKEDITOR.instances.bo_content.getData() : '';
                const postId = document.getElementById('post_id').value;

                // FormData 객체 생성
                const formData = new FormData();
                formData.append('title', document.getElementById('title').value);
                formData.append('content', content);

                try {
                    const response = await fetch(`/post/modify/rest/${postId}`, {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const html = await response.text();
                    console.log('서버에서 받은 HTML:', html);
                    updateLayoutBoard(html);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            observer.disconnect();
        }
    });

    function updateLayoutBoard(html) {
        const layoutBoard = document.getElementById('layoutBoard');
        if (layoutBoard) {
            layoutBoard.innerHTML = html;
        }
        initializeCKEditor();
    }

    function initializeCKEditor() {
        if (CKEDITOR.instances.bo_content) {
            CKEDITOR.instances.bo_content.destroy();
        }
        CKEDITOR.replace('bo_content');
    }

    observer.observe(document.body, { childList: true, subtree: true });
});