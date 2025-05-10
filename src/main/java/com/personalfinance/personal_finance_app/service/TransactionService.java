package com.personalfinance.personal_finance_app.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.personalfinance.personal_finance_app.model.Transaction;
import com.personalfinance.personal_finance_app.model.YearlySummary;
import com.personalfinance.personal_finance_app.model.Summary;
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

    public List<Summary> calculateWeeklySummary() {
        
        // Sätter upp dagarna så att vi börjar från måndagen
        LocalDate startOfWeek = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        // Skapar två listor med income och expense för att hitta datumet till den specifika typen
        List<Transaction> incomes = transactionRepo.findByTypeAndDateBetween("income", startOfWeek, endOfWeek);
        List<Transaction> expenses = transactionRepo.findByTypeAndDateBetween("expense", startOfWeek, endOfWeek);

        //Mappar varje typ för att hitta datumet och kostnaden för varje transaktion
        Map<LocalDate, Double> incomeMap = incomes.stream()
        .collect(Collectors.groupingBy(Transaction::getDate, Collectors.summingDouble(Transaction::getAmount)));
        
        Map<LocalDate, Double> expenseMap = expenses.stream()
        .collect(Collectors.groupingBy(Transaction::getDate, Collectors.summingDouble(Transaction::getAmount)));

        List<Summary> result = new ArrayList<>();


        // Loopar genom alla dagar där i är 0 och går hela vägen till 7, alltså veckodagarna
        // Hämtar värdet från map funktionen och lägger sedan till resultatet i ett nytt weeklysummary objekt
        for(int i= 0; i < 7; i++) {
            LocalDate date = startOfWeek.plusDays(i);
            double income = incomeMap.getOrDefault(date, 0.0);
            double expense = expenseMap.getOrDefault(date, 0.0);
            result.add(new Summary(date, income, expense));
        }

        return result;
      
    }

    public List<Summary> calculateMonthlySummary() {
        
        // Sätter upp månaderna så att vi börjar från 1 till 31
        YearMonth currentMonth = YearMonth.now();
        LocalDate start = currentMonth.atDay(1);
        LocalDate end =  currentMonth.atEndOfMonth();

        // Skapar två listor med income och expense för att hitta datumet till den specifika typen
        List<Transaction> incomes = transactionRepo.findByTypeAndDateBetween("income", start, end);
        List<Transaction> expenses = transactionRepo.findByTypeAndDateBetween("expense", start, end);

        //Mappar varje typ för att hitta datumet och kostnaden för varje transaktion
        Map<LocalDate, Double> incomeMap = incomes.stream()
        .collect(Collectors.groupingBy(Transaction::getDate, Collectors.summingDouble(Transaction::getAmount)));
        
        Map<LocalDate, Double> expenseMap = expenses.stream()
        .collect(Collectors.groupingBy(Transaction::getDate, Collectors.summingDouble(Transaction::getAmount)));

        List<Summary> result = new ArrayList<>();

        // Loopar genom alla dagar där i är 1 och går hela vägen till 31, alltså en hel månad
        // Hämtar värdet från map funktionen och lägger sedan till resultatet i listan
        for(int i= 1; i <= currentMonth.lengthOfMonth(); i++) {
            LocalDate date = start.plusDays(i);
            double income = incomeMap.getOrDefault(date, 0.0);
            double expense = expenseMap.getOrDefault(date, 0.0);
            result.add(new Summary(date, income, expense));
        }

        return result;
      
    }


    public List<YearlySummary> calculateYearlySummary() {
        
        // Sätter upp året
        LocalDate start = LocalDate.now().withDayOfYear(1);
        LocalDate end =  start.withDayOfYear(start.lengthOfYear());

        // Skapar två listor med income och expense för att hitta datumet till den specifika typen
        List<Transaction> incomes = transactionRepo.findByTypeAndDateBetween("income", start, end);
        List<Transaction> expenses = transactionRepo.findByTypeAndDateBetween("expense", start, end);

        //Mappar varje typ för att hitta datumet och kostnaden för varje transaktion
        // Här används month istället för localdate för att gruppera per månad och inte varje enskild dag
        Map<Month, Double> incomeMap = incomes.stream()
        .collect(Collectors.groupingBy(t -> t.getDate().getMonth(), Collectors.summingDouble(Transaction::getAmount)));
        
        Map<Month, Double> expenseMap = expenses.stream()
        .collect(Collectors.groupingBy(t -> t.getDate().getMonth(), Collectors.summingDouble(Transaction::getAmount)));

        List<YearlySummary> result = new ArrayList<>();

        // Loopar genom alla månader för att räkna ut årsvis
        // Hämtar värdet från map funktionen och lägger sedan till resultatet i listan
        for(Month month : Month.values()) {
            double income = incomeMap.getOrDefault(month, 0.0);
            double expense = expenseMap.getOrDefault(month, 0.0);
            result.add(new YearlySummary(month, income, expense));
        }

        return result;
      
    }





}
