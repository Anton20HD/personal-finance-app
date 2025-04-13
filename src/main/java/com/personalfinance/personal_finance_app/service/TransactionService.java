package com.personalfinance.personal_finance_app.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Locale.Category;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    public Transaction updateTransaction(Transaction transaction, String id) {
        Transaction updateTransaction = transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id:" + id));

        updateTransaction.setTitle(transaction.getTitle());
        updateTransaction.setAmount(transaction.getAmount());
        updateTransaction.setDate(transaction.getDate());
        updateTransaction.setCategory(transaction.getCategory());

        return transactionRepo.save(updateTransaction);

    }

    public Transaction deleteTransaction(String id) {
        Transaction transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Transaction with id" + id + "not found"));

        transactionRepo.delete(transaction);
        return transaction;

    }
}
