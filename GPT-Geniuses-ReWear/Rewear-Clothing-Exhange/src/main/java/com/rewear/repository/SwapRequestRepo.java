package com.rewear.repository;

import com.rewear.entity.SwapRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwapRequestRepo extends JpaRepository<SwapRequest, Long> {
    List<SwapRequest> findByRequestedItem_User_Id(Long userId);
}
