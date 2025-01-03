document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".board-button").forEach(button => {
        button.addEventListener("click", event => {
            const boardType = event.target.dataset.board;
            console.log(boardType);

            fetch(`/layout/board/rest/${boardType}`)
        })
    })
})