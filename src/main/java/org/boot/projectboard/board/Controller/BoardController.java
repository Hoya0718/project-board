package org.boot.projectboard.board.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BoardController {
    @GetMapping("/layout/board/")
    public String board(@RequestParam(value = "post", required = false)String post, Model model) {
        if(post != null){
            model.addAttribute("post", post);
            return "layout/post";
        }
        return "layout/board";
    }
}
