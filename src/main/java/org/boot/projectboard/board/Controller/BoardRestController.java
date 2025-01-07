package org.boot.projectboard.board.Controller;

import lombok.RequiredArgsConstructor;
import org.boot.projectboard.board.Entity.Board;
import org.boot.projectboard.board.Repository.BoardRepository;
import org.boot.projectboard.posts.Entity.Posts;
import org.boot.projectboard.posts.Repository.PostsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class BoardRestController {
    private final BoardRepository boardRepository;
    private final PostsRepository postsRepository;
    @GetMapping("/layout/board/rest/{post}")
    public String restTest(@PathVariable("post") String post, Model model) {
        try {
            Board board = boardRepository.findIdByPostName(post);

            if (board == null) {
                return "layout/board";
            }

            List<Posts> posts = postsRepository.findAllByBoardId(board.getId());

            // board 테이블의 해당되는 id찾기
            model.addAttribute("post", post);
            // post 테이블의 id에 해당되는 값 전부 가져오기
            model.addAttribute("posts", posts);

            return "layout/tposts :: tpostsbar";

        } catch (Exception e) {
            e.printStackTrace();
            return "layout/error";
        }
    }

    @GetMapping("/layout/board/rest/main")
    public String mainBoard() {
        return "layout/tboard :: tboardbar";
    }
}
