package com.personalfinance.personal_finance_app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalfinance.personal_finance_app.model.Summary;
import com.personalfinance.personal_finance_app.model.Transaction;
import com.personalfinance.personal_finance_app.model.YearlySummary;
import com.personalfinance.personal_finance_app.service.TransactionService;

import lombok.AllArgsConstructor;

//File to use endpoints such as get,post,delete,put.

// //Instead of writing public TransactionController(TransactionService transactionService) {
//     this.transactionService = transactionService;
// }
// can you just do allArgsConstructor that generates automatically a constructor. 
@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
public class TransactionController {

    // Uses final for only assigning a variable once, cant be changed
    private final TransactionService transactionService;

    @GetMapping
    public List<Transaction> fetchAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/{category}")
    public List<Transaction> getOneCategory(@PathVariable String category) {
        return transactionService.getTransactionByCategory(category);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@RequestBody Transaction transaction, @PathVariable String id) {
            return transactionService.updateTransaction(transaction, id);
    }

    @DeleteMapping("/{id}")
    public Transaction deleteTransaction(@PathVariable String id) {
                return transactionService.deleteTransaction(id);
    }
    @GetMapping("/statistics/weekly")
    public List<Summary> getTotalSumInWeek() {
        return transactionService.calculateWeeklySummary();
    } 

    @GetMapping("/statistics/monthly")
    public List<Summary> getTotalSumInMonth() {
        return transactionService.calculateMonthlySummary();
    } 

    @GetMapping("/statistics/yearly")
    public List<YearlySummary> getTotalSumInYear() {
        return transactionService.calculateYearlySummary();
    }

    
    



}
