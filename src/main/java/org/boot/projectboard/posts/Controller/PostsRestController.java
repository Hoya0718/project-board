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
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
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

    @PostMapping("/post/modify/rest/{id}")
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
    public String twrite(@ModelAttribute PostsDTO postsDTO, Model model) {
        System.out.println("twrite 컨트롤러 실행");

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

        // 저장 후 바로 데이터 조회
        String post = postsDTO.getPost();
        Board foundBoard = boardRepository.findIdByPostName(post);

        if (foundBoard == null) {
            return "layout/tboard :: tboardbar";
        }

        List<Posts> allPosts = postsRepository.findAllByBoardId(foundBoard.getId());

        // Model에 데이터 추가
        model.addAttribute("post", post);
        model.addAttribute("posts", allPosts);
        System.out.println("반환성공했냐?");
        // 프래그먼트 직접 반환
        return "layout/tposts :: tpostsbar";
    }

}
