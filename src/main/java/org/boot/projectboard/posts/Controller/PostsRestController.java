package org.boot.projectboard.posts.Controller;

import lombok.RequiredArgsConstructor;
import org.boot.projectboard.posts.Entity.Posts;
import org.boot.projectboard.posts.Repository.PostsRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@RequiredArgsConstructor
@Controller
public class PostsRestController {
    private final PostsRepository postsRepository;
    @GetMapping("/post/view/rest/{id}")
    public String view(@PathVariable Integer id, Model model) {

        Optional<Posts> optional = postsRepository.findById(id);
        if(optional.isPresent()) {
            Posts posts = optional.get();
            model.addAttribute("post", posts);
            System.out.println("실행했다.");
            return "layout/tpost :: tpostbar";
        }
        model.addAttribute("postId", id);
        return "layout/tpost :: tpostbar";
    }
}
