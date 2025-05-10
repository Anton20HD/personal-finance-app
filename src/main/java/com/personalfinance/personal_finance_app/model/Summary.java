package com.personalfinance.personal_finance_app.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

// Represent summary data per day with total amount of income and expense

@Data
@AllArgsConstructor
public class Summary {

    private LocalDate date;
    private double income;
    private double expense;

}
