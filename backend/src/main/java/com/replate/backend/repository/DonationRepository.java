package com.replate.backend.repository;

import com.replate.backend.enums.DonationStatus;
import com.replate.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findAllByUserId(Long donorId);
    List<Donation> findAllByUserIdAndStatus(Long donorId, DonationStatus status);

    String status(DonationStatus status);
}
