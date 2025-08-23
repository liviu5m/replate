package com.replate.backend.model;

import com.replate.backend.enums.VerificationIDType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Verification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private VerificationIDType idType;
    private int idNumber;
    private String documentUrl;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName="id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public Verification(VerificationIDType idType, int idNumber, String documentUrl, User user) {
        this.idType = idType;
        this.idNumber = idNumber;
        this.documentUrl = documentUrl;
        this.user = user;
    }
}
