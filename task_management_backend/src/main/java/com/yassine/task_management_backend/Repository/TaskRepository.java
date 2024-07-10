package com.yassine.task_management_backend.Repository;

import com.yassine.task_management_backend.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Repository interface for managing Task entities
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Custom query to find all tasks associated with a specific user ID
    List<Task> findByUserId(Long userId);

    // Custom query to find a task by its ID and associated user ID
    Optional<Task> findByIdAndUserId(Long id, Long userId);
}
