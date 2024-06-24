package com.yassine.task_management_backend.Repository;

import com.yassine.task_management_backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
