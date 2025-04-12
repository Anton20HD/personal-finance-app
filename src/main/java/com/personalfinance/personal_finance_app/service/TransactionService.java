package com.personalfinance.personal_finance_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.personalfinance.personal_finance_app.model.Transaction;
import com.personalfinance.personal_finance_app.repository.TransactionRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionService {
    
    private final TransactionRepo transactionRepo;

    public List<Transaction> getAllTransactions() {
            return transactionRepo.findAll();

    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepo.save(transaction);
    }

    public List<Transaction> getTransactionByCategory(String category) {
        return transactionRepo.findByCategory(category);
    }

    




}
