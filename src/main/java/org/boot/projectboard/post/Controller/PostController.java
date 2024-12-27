package org.boot.projectboard.post.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PostController {

    @GetMapping("/post/{url}")
    public String post(@PathVariable String url, Model model) {
        return "post";
    }
}
