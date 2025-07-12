package com.rewear.controller;

import com.rewear.entity.Item;
import com.rewear.entity.Role;
import com.rewear.entity.User;
import com.rewear.repository.ItemRepo;
import com.rewear.repository.UserRepo;
import com.rewear.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

public class usercontroller {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ItemRepo itemRepo;


    // usercontroller.java (signup method)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user, HttpSession session) {
        if (userRepo.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        user.setRole(Role.USER); // Default role for all new signups

        String otp = UserService.generateotp();
        UserService.sendOTP(user.getEmail(), otp);

        session.setAttribute("otp", otp);
        session.setAttribute("otpEmail", user.getEmail());
        session.setAttribute("pendingUser", user);

        return ResponseEntity.ok("OTP sent to your email. Please verify to complete signup.");
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email,
                                            @RequestParam String otp,
                                            HttpSession session) {
        String sessionOtp = (String) session.getAttribute("otp");
        String sessionEmail = (String) session.getAttribute("otpEmail");
        User pendingUser = (User) session.getAttribute("pendingUser");

        if (sessionOtp == null || sessionEmail == null || pendingUser == null) {
            return ResponseEntity.badRequest().body("Session expired or no signup request found.");
        }

        if (!email.equals(sessionEmail)) {
            return ResponseEntity.badRequest().body("Email mismatch.");
        }

        if (!otp.equals(sessionOtp)) {
            return ResponseEntity.status(401).body("Incorrect OTP.");
        }

        // Save user after successful OTP verification
        userRepo.save(pendingUser);

        // Clear session data
        session.removeAttribute("otp");
        session.removeAttribute("otpEmail");
        session.removeAttribute("pendingUser");

        return ResponseEntity.ok("Signup successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest, HttpSession session) {
        Optional<User> userOpt = userRepo.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                session.setAttribute("userId", user.getId());
                session.setAttribute("userEmail", user.getEmail());
                return ResponseEntity.ok("Login successful!");
            } else {
                return ResponseEntity.status(401).body("Incorrect password");
            }
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully.");
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(HttpSession session) {
        Object userId = session.getAttribute("userId");
        Object userEmail = session.getAttribute("userEmail");

        if (userId == null || userEmail == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        return ResponseEntity.ok("Logged in as: " + userEmail);
    }

    @GetMapping("/user-items")
    public ResponseEntity<?> getItemsByUserEmail(@RequestParam String email) {
        List<Item> items = itemRepo.findItemsByUserEmail(email);

        if (items.isEmpty()) {
            return ResponseEntity.status(404).body("No items found for user with email: " + email);
        }

        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<String> deleteAccount(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        userRepo.deleteById(userId);
        session.invalidate(); // Log them out after deletion
        return ResponseEntity.ok("Account deleted successfully.");
    }




}
