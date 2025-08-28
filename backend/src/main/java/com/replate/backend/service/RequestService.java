package com.replate.backend.service;

import com.replate.backend.dto.RequestDto;
import com.replate.backend.enums.DonationStatus;
import com.replate.backend.enums.RequestStatus;
import com.replate.backend.model.Request;
import com.replate.backend.model.User;
import com.replate.backend.repository.RequestRepository;
import com.replate.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    public RequestService(RequestRepository requestRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    public Request createRequest(RequestDto requestDto) {
        Request request = new Request();
        User ngo = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new RuntimeException("NGO not found"));
        request.setNgo(ngo);
        request.setStatus(requestDto.getStatus());
        return  requestRepository.save(request);
    }

    public Optional<Request> getRequest(Long id) {
        return requestRepository.findById(id);
    }

    public List<Request> getRequests(Long ngoId, String sorting) {
        if (sorting.equals("all")) {
            return requestRepository.findAllByNgoId(ngoId);
        }
        return requestRepository.findAllByNgoIdAndStatus(ngoId, RequestStatus.valueOf(sorting));
    }

    public Request updateRequest(RequestDto requestDto, Long id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        User ngo = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new RuntimeException("NGO not found"));
        request.setNgo(ngo);
        request.setStatus(requestDto.getStatus());
        return requestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

}
