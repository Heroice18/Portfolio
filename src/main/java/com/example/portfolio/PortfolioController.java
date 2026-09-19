package com.example.portfolio;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PortfolioController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Brandon");
        model.addAttribute("page", "Home");
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About | Brandon");
        model.addAttribute("page", "About");
        return "about";
    }
}
