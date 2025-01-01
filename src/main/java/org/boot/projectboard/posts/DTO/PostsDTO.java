package org.boot.projectboard.posts.DTO;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostsDTO {
    private int id;
    private String title;
    private String content;
    private Integer board_id;
    private Integer user_id;
    private String post;
}
