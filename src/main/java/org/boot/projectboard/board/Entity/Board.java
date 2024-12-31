package org.boot.projectboard.board.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.boot.projectboard.posts.Entity.Posts;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "post_name")
    private String postName;

}
