    package com.rewear.controller;

    import com.rewear.entity.Item;
    import com.rewear.entity.User;
    import com.rewear.repository.ItemRepo;
    import com.rewear.repository.UserRepo;
    import jakarta.servlet.http.HttpSession;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.util.Optional;

    @RestController
    public class ItemController {

        @Autowired
        private ItemRepo itemRepo;
        @Autowired
        private UserRepo userRepo;

        @PostMapping(value = "/upload-item", consumes = "multipart/form-data")
        public ResponseEntity<String> uploadItem(
                @RequestParam String title,
                @RequestParam String description,
                @RequestParam String category,
                @RequestParam String size,
                @RequestParam String type,
                @RequestParam String itemcondition,
                @RequestParam String tags,
                @RequestParam MultipartFile image,
                HttpSession session
        ) {
            Object userIdObj = session.getAttribute("userId");
            if (userIdObj == null) {
                return ResponseEntity.status(401).body("Not logged in");
            }

            Long userId = (Long) userIdObj;
            Optional<User> userOpt = userRepo.findById(userId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            try {
                Item item = new Item();
                item.setTitle(title);
                item.setDescription(description);
                item.setCategory(category);
                item.setSize(size);
                item.setType(type);
                item.setItemcondition(itemcondition);
                item.setTags(tags);
                item.setImageData(image.getBytes());
                item.setUser(userOpt.get()); // ✅ Set user



                itemRepo.save(item);
                return ResponseEntity.ok("Item uploaded successfully");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error uploading item: " + e.getMessage());
            }
        }


        @GetMapping("/item/{id}/image")
        public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
            Optional<Item> itemOpt = itemRepo.findById(id);
            if (itemOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Item item = itemOpt.get();
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg") // or image/png depending on what you allow
                    .body(item.getImageData());
        }

        @DeleteMapping("/item/{id}")
        public ResponseEntity<String> deleteItem(@PathVariable Long id) {
            Optional<Item> itemOpt = itemRepo.findById(id);
            if (itemOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Item not found");
            }

            itemRepo.deleteById(id);
            return ResponseEntity.ok("Item deleted successfully");
        }
    }
