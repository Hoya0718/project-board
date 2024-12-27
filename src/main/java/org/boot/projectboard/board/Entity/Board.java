package org.boot.projectboard.board.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.context.annotation.Primary;

@Entity
public class Board {
    @Id
    private int id;
    private String name;
}
