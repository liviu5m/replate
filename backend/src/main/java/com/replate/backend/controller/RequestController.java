package com.replate.backend.controller;

import com.replate.backend.dto.RequestDto;
import com.replate.backend.model.Request;
import com.replate.backend.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/request")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<Request> getRequests(@RequestParam Long ngoId,@RequestParam String sorting) {
        return requestService.getRequests(ngoId, sorting);
    }

    @GetMapping("/{id}")
    public Optional<Request> getRequest(@PathVariable Long id) {
        return requestService.getRequest(id);
    }

    @PostMapping
    public Request createRequest(@RequestBody RequestDto requestDto) {
        return requestService.createRequest(requestDto);
    }

    @PutMapping("/{id}")
    public Request updateRequest(@PathVariable Long id, @RequestBody RequestDto requestDto) {
        return requestService.updateRequest(requestDto, id);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
    }
}
