package org.boot.projectboard.board.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class BoardRestController {
    @GetMapping("/layout/board/rest/{post}")
    public String restTest() {
        return "layout/tposts :: tpostsbar ";
    }

    @GetMapping("/layout/board/rest/main")
    public String mainBoard() {
        return "layout/tboard :: tboardbar";
    }
}
