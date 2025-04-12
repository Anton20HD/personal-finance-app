package com.personalfinance.personal_finance_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalfinance.personal_finance_app.model.Transaction;
import com.personalfinance.personal_finance_app.repository.TransactionRepo;

//File to use endpoints such as get,post,delete,put.

@RestController
@RequestMapping("/transactions")
public class PersonalFinanceController {

    @Autowired
    private TransactionRepo transactionRepo;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionRepo.save(transaction);
    }

}
