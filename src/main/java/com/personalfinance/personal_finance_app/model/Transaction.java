package com.personalfinance.personal_finance_app.model;

import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

//Entity class

@Data
@AllArgsConstructor
@Document(collection= "transaction")
public class Transaction {


    @Id
    private String id;

    private String title;

    private Integer amount;

    private LocalDate date;

    private String category;

}
