package com.yassine.task_management_backend.Controller;


import com.yassine.task_management_backend.Entity.Task;
import com.yassine.task_management_backend.Entity.User;
import com.yassine.task_management_backend.Repository.UserRepository;
import com.yassine.task_management_backend.Service.TaskService;
import com.yassine.task_management_backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // Retrieve all tasks for the authenticated user
    @GetMapping
    public List<Task> getAllTasks(Principal principal) {
        System.out.println(principal.getName()); // Log the current user's name (for debugging)
        User user = userRepository.findByEmail(principal.getName()); // Find user by email
        return taskService.getAllTasksByUser(user.getId()); // Return tasks associated with the user
    }

    // Retrieve a task by ID for the authenticated user
    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()); // Find user by email
        Optional<Task> task = taskService.getTaskByIdAndUser(taskId, user.getId()); // Get task by ID and user ID
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); // Return task if found, otherwise return 404
    }

    // Create a new task for the authenticated user
    @PostMapping
    public Task createTask(@RequestBody Task task, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()); // Find user by email
        task.setUser(user); // Set the task's user
        return taskService.createTask(task); // Create and return the created task
    }

    // Update an existing task for the authenticated user
    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task taskDetails, Principal principal) {
        System.out.println(taskId); // Log the task ID (for debugging)
        System.out.println(taskDetails); // Log the task details (for debugging)
        System.out.println(principal); // Log the principal (for debugging)
        User user = userRepository.findByEmail(principal.getName()); // Find user by email
        Optional<Task> task = taskService.getTaskByIdAndUser(taskId, user.getId()); // Get task by ID and user ID
        if (task.isPresent()) {
            Task updatedTask = task.get();
            updatedTask.setTitle(taskDetails.getTitle()); // Update task title
            updatedTask.setDescription(taskDetails.getDescription()); // Update task description
            updatedTask.setDueDate(taskDetails.getDueDate()); // Update task due date
            updatedTask.setStatus(taskDetails.getStatus()); // Update task status
            return ResponseEntity.ok(taskService.createTask(updatedTask)); // Return updated task
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if task not found
        }
    }

    // Delete a task by ID for the authenticated user
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()); // Find user by email
        Optional<Task> task = taskService.getTaskByIdAndUser(taskId, user.getId()); // Get task by ID and user ID
        if (task.isPresent()) {
            taskService.deleteTask(taskId); // Delete task by ID
            return ResponseEntity.noContent().build(); // Return 204 if successful deletion
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if task not found
        }
    }
}
