package org.boot.projectboard.posts.Controller;

import lombok.RequiredArgsConstructor;
import org.boot.projectboard.board.Entity.Board;
import org.boot.projectboard.board.Repository.BoardRepository;
import org.boot.projectboard.member.Entity.User;
import org.boot.projectboard.posts.DTO.PostsDTO;
import org.boot.projectboard.posts.Entity.Posts;
import org.boot.projectboard.posts.Repository.PostsRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RequiredArgsConstructor
@Controller
public class PostsRestController {
    private final PostsRepository postsRepository;
    private final BoardRepository boardRepository;

    @GetMapping("/post/view/rest/{id}")
    public String view(@PathVariable Integer id, Model model) {

        Optional<Posts> optional = postsRepository.findById(id);
        if(optional.isPresent()) {
            Posts posts = optional.get();
            model.addAttribute("post", posts);
            return "layout/tpost :: tpostbar";
        }
        model.addAttribute("postId", id);
        return "layout/tpost :: tpostbar";
    }

    @GetMapping("/post/modify/rest/{id}")
    public String modifyPost(@PathVariable Integer id, Model model) throws UnsupportedEncodingException {
        Optional<Posts> optional = postsRepository.findById(id);
        if(optional.isPresent()) {
            Posts posts = optional.get();
            model.addAttribute("post", posts);
            return "layout/tmodify :: tmodifybar";
        }
        return "layout/tpost :: tpostbar";
    }

    @GetMapping("/test1")
    public String test1(@ModelAttribute PostsDTO postsDTO, Model model) {
        String post = postsDTO.getPost();
        model.addAttribute("post", post);
        Board board = boardRepository.findIdByPostName(post);
        Integer board_id = board.getId();

        model.addAttribute("board_id", board_id);
        return "layout/twrite :: twritebar";
    }

    @PostMapping("/twrite")
    public String twrite(@ModelAttribute PostsDTO postsDTO) {
        System.out.println(postsDTO);


        // 수정: 리다이렉트 경로 변경
        return "redirect:/layout/board";

    }
}
