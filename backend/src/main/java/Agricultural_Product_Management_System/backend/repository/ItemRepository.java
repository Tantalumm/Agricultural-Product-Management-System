package Agricultural_Product_Management_System.backend.repository;

import Agricultural_Product_Management_System.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
