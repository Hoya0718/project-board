document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".board-button").forEach(button => {
        button.addEventListener("click", event => {
            const boardType = event.target.dataset.board;
            console.log(boardType);

            loadContent('/')

            fetch(`/layout/board/rest/${boardType}`)
                .then(res => res.json())
                .then
        })
    })
})