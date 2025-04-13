package com.personalfinance.personal_finance_app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.personalfinance.personal_finance_app.model.Transaction;

// Repository allows us to store/access the information stored in the Mongo database(Has all methods for the CRUD)

@Repository
public interface TransactionRepo extends MongoRepository<Transaction, String> {

    public List<Transaction> findByTitle(String title);

    public List<Transaction> findByCategory(String category);

    public List<Transaction> findAllByDateBetween(LocalDateTime start, LocalDateTime end);



}
