package com.yassine.task_management_backend.Entity;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),   // Permission to read administrative data
    ADMIN_UPDATE("admin:update"),   // Permission to update administrative data
    ADMIN_CREATE("admin:create"),   // Permission to create administrative data
    ADMIN_DELETE("admin:delete");   // Permission to delete administrative data

    private final String permission;

    // Constructor with permission string initialization
    Permission(String permission) {
        this.permission = permission;
    }
}
