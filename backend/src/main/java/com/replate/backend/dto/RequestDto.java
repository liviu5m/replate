package com.replate.backend.dto;

import com.replate.backend.enums.RequestStatus;
import lombok.Getter;

@Getter
public class RequestDto {
    private Long userId;
    private RequestStatus status;
}
