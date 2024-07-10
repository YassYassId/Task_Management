package com.yassine.task_management_backend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the task

    private String title; // Title or name of the task

    private String description; // Description or details of the task

    private LocalDate dueDate; // Due date for completing the task

    @Enumerated(EnumType.STRING)
    private Status status; // Current status of the task (e.g., pending, completed)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // User assigned to the task

}
