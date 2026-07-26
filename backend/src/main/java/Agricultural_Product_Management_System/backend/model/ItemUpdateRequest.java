package Agricultural_Product_Management_System.backend.model;

public record ItemUpdateRequest(
        String name,
        String description,
        Double price,
        Integer quantity,
        String imageUrl) {
}
