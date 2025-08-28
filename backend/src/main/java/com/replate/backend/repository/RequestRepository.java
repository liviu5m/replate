package com.replate.backend.repository;

import com.replate.backend.enums.DonationStatus;
import com.replate.backend.enums.RequestStatus;
import com.replate.backend.model.Donation;
import com.replate.backend.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long> {
    List<Request> findAllByNgoId(Long ngoId);
    List<Request> findAllByNgoIdAndStatus(Long ngoId, RequestStatus status);
}
