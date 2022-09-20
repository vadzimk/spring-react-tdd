package com.hoxify.hoxify.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring will crate a proxy implementation for this interface with all the crud methods and the count method
    // No annotation is necessary for this interface
}
