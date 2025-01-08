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
});