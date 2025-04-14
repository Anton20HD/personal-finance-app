package com.personalfinance.personal_finance_app.service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.NoSuchElementException;

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

    public int calculateWeeklySummary(int year, int week) {

//  Syfte:
// Returnera en sammanställning av alla transaktioner under en viss vecka.

// Steg:

// Använd dateInWeek för att räkna ut måndag och söndag den veckan.

// Hämta alla transaktioner mellan dessa datum.

// Summera.

        LocalDateTime startOfWeek = LocalDateTime.of(year,1,1,0,0,0,0)
        .with(WeekFields.of(Locale.getDefault()).weekOfYear(),week)
        .with(WeekFields.of(Locale.getDefault()).dayOfWeek(), DayOfWeek.MONDAY.getValue());

        LocalDateTime endOfWeek = startOfWeek.plusDays(6);

        List<Transaction> result = transactionRepo.findAllByDateBetween(startOfWeek, endOfWeek);

        int total = result.stream()
        .mapToInt(Transaction::getAmount)
        .sum();

        return total;
      
    }

    public int calculateMonthlyTransactionSummary(int year, int month) {

          // Start of the month at midnight (00:00:00, day 1)
        LocalDateTime start = LocalDateTime.of(year, month, 1,0,0,0);
        
            // Calculate how many days are in the month
        int lastDay = YearMonth.of(year,month).lengthOfMonth();

            // create a date-time for the end of the month at 23:59:59
        LocalDateTime end = LocalDateTime.of(year,month, lastDay,
        23,59,59);


        // handles first and last dates in the month
         List<Transaction> result = transactionRepo.findAllByDateBetween(start,end);

        System.out.println("Hämtade transaktioner:");
        result.forEach(transaction -> System.out.println(transaction));


         int total = result.stream()
            .mapToInt(Transaction::getAmount)
            .sum();

            return total;
          
    }

        public int calculateYearlyTransactionSummary(int year) {

            LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0,0,0);
            LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59,59,  999999999);

             // handles first and last dates in the month
         List<Transaction> result = transactionRepo.findAllByDateBetween(startOfYear,endOfYear);

         System.out.println("Hämtade transaktioner:");
         result.forEach(transaction -> System.out.println(transaction));
 
 
          int total = result.stream()
             .mapToInt(Transaction::getAmount)
             .sum();
 
             return total;

        }


}
