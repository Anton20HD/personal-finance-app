package com.personalfinance.personal_finance_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


//File to use endpoints such as get,post,delete,put.

@RestController
public class PersonalFinanceController {

        @GetMapping("/hello")
        public String hello() {
            return "Hello, World!";
        }

}
