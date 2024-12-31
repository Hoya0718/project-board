package org.boot.projectboard.board.Repository;

import org.boot.projectboard.board.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Board findIdByPostName(String post_name);

    @Query("SELECT b.postName FROM Board b WHERE b.id = :id")
    String findPostNameById(Integer id);
}
