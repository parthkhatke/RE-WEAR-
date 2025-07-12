package com.rewear.controller;

import com.rewear.entity.Item;
import com.rewear.entity.SwapRequest;
import com.rewear.entity.User;
import com.rewear.repository.ItemRepo;
import com.rewear.repository.SwapRequestRepo;
import com.rewear.repository.UserRepo;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SwapController {

    @Autowired
    private SwapRequestRepo swapRequestRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private UserRepo userRepo;

    // ✅ 1. CREATE SWAP REQUEST
    @PostMapping("/swap")
    public ResponseEntity<String> createSwapRequest(@RequestBody SwapRequestDTO swapRequestDTO, HttpSession session) {
        Object userIdObj = session.getAttribute("userId");
        if (userIdObj == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        Long userId = (Long) userIdObj;
        Optional<User> requesterOpt = userRepo.findById(userId);
        Optional<Item> offeredOpt = itemRepo.findById(swapRequestDTO.getOfferedItemId());
        Optional<Item> targetOpt = itemRepo.findById(swapRequestDTO.getTargetItemId());

        if (requesterOpt.isEmpty() || offeredOpt.isEmpty() || targetOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid items or user");
        }

        Item offered = offeredOpt.get();
        Item target = targetOpt.get();

        // Check if items are already pending
        if ("PENDING".equalsIgnoreCase(offered.getItemcondition()) ||
                "PENDING".equalsIgnoreCase(target.getItemcondition())) {
            return ResponseEntity.badRequest().body("One of the items is already involved in a pending swap.");
        }

        // Mark items as pending
        offered.setItemcondition("PENDING");
        target.setItemcondition("PENDING");

        SwapRequest swapRequest = new SwapRequest();
        swapRequest.setRequester(requesterOpt.get());
        swapRequest.setOfferedItem(offered);
        swapRequest.setRequestedItem(target); // NOT setTargetItem()
        swapRequest.setStatus(SwapRequest.Status.PENDING);

        itemRepo.save(offered);
        itemRepo.save(target);
        swapRequestRepo.save(swapRequest);

        return ResponseEntity.ok("Swap request created successfully");
    }

    // ✅ 2. GET SWAP REQUESTS WHERE LOGGED-IN USER IS OWNER OF REQUESTED ITEM
    @GetMapping("/my-requests")
    public ResponseEntity<?> getMySwapRequests(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        List<SwapRequest> requests = swapRequestRepo.findByRequestedItem_User_Id(userId);
        return ResponseEntity.ok(requests);
    }

    // ✅ 3. ACCEPT A SWAP REQUEST
    @PostMapping("/accept")
    public ResponseEntity<String> acceptSwap(@RequestParam Long requestId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        Optional<SwapRequest> opt = swapRequestRepo.findById(requestId);
        if (opt.isEmpty()) return ResponseEntity.status(404).body("Request not found");

        SwapRequest request = opt.get();

        if (request.getRequestedItem() == null) {
            return ResponseEntity.status(400).body("Requested item is missing in swap request");
        }

        if (!request.getRequestedItem().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("You are not the owner of the requested item");
        }

        request.setStatus(SwapRequest.Status.ACCEPTED);
        swapRequestRepo.save(request);

        // Mark items as swapped
        request.getRequestedItem().setTags("Swapped");
        request.getOfferedItem().setTags("Swapped");
        itemRepo.save(request.getRequestedItem());
        itemRepo.save(request.getOfferedItem());

        return ResponseEntity.ok("Swap accepted");
    }


    // ✅ 4. REJECT A SWAP REQUEST
    @PostMapping("/reject")
    public ResponseEntity<String> rejectSwap(@RequestParam Long requestId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        Optional<SwapRequest> opt = swapRequestRepo.findById(requestId);
        if (opt.isEmpty()) return ResponseEntity.status(404).body("Request not found");

        SwapRequest request = opt.get();

        if (!request.getRequestedItem().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("You are not the owner of the requested item");
        }

        request.setStatus(SwapRequest.Status.REJECTED);
        swapRequestRepo.save(request);

        // Reset item conditions to available
        request.getRequestedItem().setItemcondition("AVAILABLE");
        request.getOfferedItem().setItemcondition("AVAILABLE");

        itemRepo.save(request.getRequestedItem());
        itemRepo.save(request.getOfferedItem());

        return ResponseEntity.ok("Swap rejected");
    }

    // ✅ DTO CLASS TO RECEIVE JSON INPUT
    @Data
    public static class SwapRequestDTO {
        private Long offeredItemId;
        private Long targetItemId;
    }
}
