package com.personalfinance.personal_finance_app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Transaction {

    @Id
    private Integer id;

    private String title;

    private Integer amount;

    private String date;

    private String category;

}
