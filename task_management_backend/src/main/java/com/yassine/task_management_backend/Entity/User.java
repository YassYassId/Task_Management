package com.yassine.task_management_backend.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the user

    private String nom; // User's last name

    private String prenom; // User's first name

    @Column(unique = true)
    private String email; // Unique email address used for authentication

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; // User's password (access is restricted to write only)

    @Enumerated(EnumType.STRING)
    private Role role; // User's role in the system

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities(); // Retrieve user's authorities based on assigned role
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email; // Return email as the username for authentication
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // User account never expires (static implementation)
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // User account is never locked (static implementation)
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // User credentials (password) never expire (static implementation)
    }

    @Override
    public boolean isEnabled() {
        return true; // User account is always enabled (static implementation)
    }
}
