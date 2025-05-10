package com.personalfinance.personal_finance_app.model;

import java.time.Month;

import lombok.AllArgsConstructor;
import lombok.Data;

// Represent summary data per day with total amount of income and expense

@Data
@AllArgsConstructor
public class YearlySummary {

    private Month month;
    private double income;
    private double expense;

}
