package org.boot.projectboard.board.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardRestController {
    @GetMapping("/layout/board/rest/{post}")
    public ResponseEntity<String> restTest() {

        return ResponseEntity.ok("Rest Test");
    }
}
