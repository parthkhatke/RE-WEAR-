package com.rewear.repository;

import com.rewear.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepo extends JpaRepository<Item, Long> {
    List<Item> findAllByUserId(Long userId);

    @Query("SELECT i FROM Item i WHERE i.user.email = :email")
    List<Item> findItemsByUserEmail(String email);
}
