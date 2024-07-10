package com.yassine.task_management_backend.Configuration;


import com.yassine.task_management_backend.Service.JWTService;
import com.yassine.task_management_backend.Service.UserService;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserService userService;

    // Constructor injection of JWTService and UserService
    public JwtAuthenticationFilter(@Lazy JWTService jwtService, @Lazy UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Check if Authorization header is present and starts with "Bearer "
        if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Continue to the next filter in the chain
            return;
        }

        // Extract JWT token from Authorization header
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // Check if username is extracted from JWT and there is no existing authentication in SecurityContextHolder
        if (StringUtils.isNotEmpty(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from UserDetailsService based on username
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(username);

            // Validate JWT token against loaded user details
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Create authentication token with user details and set it to the SecurityContext
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);
            }
        }

        filterChain.doFilter(request, response); // Continue to the next filter in the chain
    }
}
