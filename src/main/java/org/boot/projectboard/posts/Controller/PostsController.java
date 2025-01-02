package org.boot.projectboard.posts.Controller;

import lombok.RequiredArgsConstructor;
import org.boot.projectboard.board.Entity.Board;
import org.boot.projectboard.board.Repository.BoardRepository;
import org.boot.projectboard.member.Entity.User;
import org.boot.projectboard.posts.DTO.PostsDTO;
import org.boot.projectboard.posts.Entity.Posts;
import org.boot.projectboard.posts.Repository.PostsRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RequiredArgsConstructor
@Controller
public class PostsController {

    private final PostsRepository postsRepository;
    private final BoardRepository boardRepository;
    // 수정: 경로 파라미터 {post}를 받기 위한 @GetMapping 수정
    @GetMapping("/write/{post}")
    public String write(@PathVariable("post") String post, Model model) {
        if (post != null) {
            model.addAttribute("post", post); // 모델에 post 추가
            Board board = boardRepository.findIdByPostName(post);
            Integer board_id = board.getId();
            model.addAttribute("board_id", board_id);
            return "layout/write"; // 해당 post가 있을 때 'write' 페이지로
        }
        return "layout/board"; // post가 없으면 'board' 페이지로
    }

    @PostMapping("/write")
    public String writePost(@ModelAttribute PostsDTO postsDTO){

        User user = new User();
        Board board = new Board();

        user.setId(postsDTO.getUser_id());
        board.setId(postsDTO.getBoard_id());

        Posts posts = new Posts();
        posts.setTitle(postsDTO.getTitle());
        posts.setContent(postsDTO.getContent());
        posts.setBoard(board);
        posts.setUser(user);

        postsRepository.save(posts);

        // URL 인코딩
        String post = postsDTO.getPost();

        // 수정: 리다이렉트 경로 변경
        return "redirect:/layout/board/" + post;
    }


    @GetMapping("/post/view/{id}")
    public String post(@PathVariable("id") Integer id, Model model) {
        Optional<Posts> optional = postsRepository.findById(id);
        if(optional.isPresent()) {
            Posts posts = optional.get();
            model.addAttribute("post", posts);
            return "layout/post";
        }
        model.addAttribute("postId", id);
        return "layout/post";
    }

    @GetMapping("/post/modify/{id}")
    public String modifyPost(@PathVariable("id") Integer id, Model model) throws UnsupportedEncodingException {
        Optional<Posts> optional = postsRepository.findById(id);
        if(optional.isPresent()) {
            Posts posts = optional.get();
            model.addAttribute("post", posts);
            return "layout/modify";
        }
        return "layout/post";
    }

    @PostMapping("/post/modify/{id}")
    public String modifiedPost(@PathVariable("id") Integer id, @RequestParam("title")String title, @RequestParam("content")String content) {

        Optional<Posts> posts = postsRepository.findById(id);
        if(posts.isPresent()) {
            posts.get().setTitle(title);
            posts.get().setContent(content);
            postsRepository.save(posts.get());
            return "redirect:/post/view/" + id;
        }
        return "redirect:/post/view/" + id;
    }

    @PostMapping("/post/delete/{id}")
    public String deletePost(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        Posts posts = postsRepository.findBoardIdById(id);
        postsRepository.deleteById(id);

        String postName = posts.getBoard().getPostName().trim();
        return "redirect:/layout/board/"+postName;
    }
}