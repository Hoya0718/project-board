package org.boot.projectboard.member.Repository;

import org.boot.projectboard.member.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
