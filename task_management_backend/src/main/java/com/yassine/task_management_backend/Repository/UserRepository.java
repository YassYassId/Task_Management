package com.yassine.task_management_backend.Repository;

import com.yassine.task_management_backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for managing User entities
public interface UserRepository extends JpaRepository<User, Long> {

    // Method to find a user by their email address
    User findByEmail(String email);

}
