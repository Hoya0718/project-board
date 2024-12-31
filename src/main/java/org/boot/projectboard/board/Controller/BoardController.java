package org.boot.projectboard.board.Controller;

import lombok.RequiredArgsConstructor;
import org.boot.projectboard.board.Entity.Board;
import org.boot.projectboard.board.Repository.BoardRepository;
import org.boot.projectboard.posts.Entity.Posts;
import org.boot.projectboard.posts.Repository.PostsRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@RequiredArgsConstructor
@Controller
public class BoardController {
    private final BoardRepository boardRepository;
    private final PostsRepository postsRepository;

    @GetMapping("/layout/board/")
    public String board(@RequestParam(value = "post", required = false) String post, Model model) {
        if (post != null) {
            System.out.println("받고실행"+post);
            model.addAttribute("post", post);
            Board board = boardRepository.findIdByPostName(post);

            List<Posts> posts = postsRepository.findAllByBoardId(board.getId());
            model.addAttribute("posts", posts);
            return "layout/posts";


        }
        return "layout/board";
    }
}
