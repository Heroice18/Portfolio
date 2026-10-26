package com.example.portfolio;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PortfolioController {

    private static final List<LinkedInPost> LINKEDIN_POSTS = List.of(
            new LinkedInPost("https://www.linkedin.com/embed/feed/update/urn:li:share:7467314817528340480?collapsed=1", 523),
            new LinkedInPost("https://www.linkedin.com/embed/feed/update/urn:li:share:7419846651093282816?collapsed=1", 630),
            new LinkedInPost("https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7414324569588715521?collapsed=1", 627)
    );

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "My Portfolio | Brandon");
        model.addAttribute("page", "Home");
        model.addAttribute("linkedinPosts", LINKEDIN_POSTS);
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About | Brandon");
        model.addAttribute("page", "About");
        return "about";
    }

    @GetMapping("/work")
    public String work(Model model) {
        model.addAttribute("title", "Experience | Brandon");
        model.addAttribute("page", "Work");
        return "work";
    }

    @GetMapping("/projects")
    public String projects(Model model) {
        model.addAttribute("title", "Projects | Brandon");
        model.addAttribute("page", "Projects");
        return "projects";
    }

    @GetMapping("/technologies")
    public String technologies(Model model) {
        model.addAttribute("title", "Technologies | Brandon");
        model.addAttribute("page", "Technologies");
        return "technologies";
    }
}
