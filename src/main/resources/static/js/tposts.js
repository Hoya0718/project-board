document.addEventListener("DOMContentLoaded", () => {
    const layoutBoard = document.getElementById('layout-board');
    const loadPostContent = (id) => {
        fetch(`/post/view/rest/${id}`)
            .then(res => res.text())
            .then(html => {
                layoutBoard.innerHTML = html;
            })
            .catch(error => console.error('Error: ', error));
    }

    const attachButtonEvents = () => {
        console.log("이거실행");
        document.querySelectorAll(".tposts-button").forEach(button => {
            button.addEventListener("click", handleButtonClick);
        });
    };

    // 버튼 클릭 핸들러
    const handleButtonClick = (event) => {
        console.log("이것도 실행")
        const id = event.target.dataset.tposts;
        console.log("버튼 실행");
        console.log(id);

        history.pushState({id: id}, '', `/board/${id}`);
        loadPostContent(id);
    };

    attachButtonEvents();
});