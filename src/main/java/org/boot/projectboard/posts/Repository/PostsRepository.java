package org.boot.projectboard.posts.Repository;

import org.boot.projectboard.posts.Entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Integer> {

    List<Posts> findAllByBoardId(int boardId);

    Posts findBoardIdById(int id);
}
