package com.yassine.task_management_backend.Entity;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()), // Role assigned to regular users with no administrative permissions

    ADMIN(Set.of(
            Permission.ADMIN_READ,
            Permission.ADMIN_UPDATE,
            Permission.ADMIN_CREATE,
            Permission.ADMIN_DELETE
    )); // Role assigned to administrators with full administrative permissions

    private final Set<Permission> permissions; // Set of permissions associated with each role

    // Method to retrieve authorities (permissions) granted to the role
    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name())); // Add ROLE_<ROLE_NAME> authority
        return authorities;
    }
}
