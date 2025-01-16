document.addEventListener("DOMContentLoaded", () => {

    const layoutBoard = document.getElementById('layout-board');

    const loadPostContent = (id) => {
        fetch(`/post/view/rest/${id}`)
            .then(res => res.text())
            .then(html => {
                layoutBoard.innerHTML = html;
            })
            .catch(error => console.error('Error: ', error));
    };

    // 이벤트 델리게이션으로 수정
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("tposts-button")) {
            const id = event.target.dataset.tposts;
            history.pushState({id: id}, '', `layout/board/rest/${id}`);
            loadPostContent(id);
        }
    });

    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.id) {
            loadPostContent(event.state.id);
        }
    });

    const functionWrite = () => {
        fetch(`/test1`)
            .then(() => {
                console.log("실행");
            })
            .catch(error => console.error("Fetch Error: ", error));
    }

    // 예시: 특정 버튼 클릭 시 functionWrite 호출
    const someButton = document.getElementById('write-button'); // 예시 버튼
    if (someButton) {
        someButton.addEventListener('click', functionWrite); // 버튼 클릭 시 functionWrite 호출
    }

});
