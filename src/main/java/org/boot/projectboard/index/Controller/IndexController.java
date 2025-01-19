package org.boot.projectboard.index.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index() {
        return "layout.html";
    }

    @GetMapping("/layout")
    public String layout() {
        return "layout.html";
    }
}
