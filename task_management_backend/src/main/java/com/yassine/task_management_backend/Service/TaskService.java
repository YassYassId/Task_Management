package com.yassine.task_management_backend.Service;


import com.yassine.task_management_backend.Entity.Task;
import com.yassine.task_management_backend.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Retrieves all tasks associated with a specific user
    public List<Task> getAllTasksByUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // Retrieves a task by its ID and associated user ID
    public Optional<Task> getTaskByIdAndUser(Long taskId, Long userId) {
        return taskRepository.findByIdAndUserId(taskId, userId);
    }

    // Creates a new task in the database
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Deletes a task from the database by its ID
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
