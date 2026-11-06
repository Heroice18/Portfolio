package com.example.portfolio;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PortfolioController {

    private static final PageFeature ABOUT_FEATURE = new PageFeature(
            "/images/about-family.jpg",
            "Brandon with his family outdoors.",
            "",
            "About Me",
            "Hiya! My name is Brandon Ison. I'm a senior software engineer, father, and leader and I love my life I've built for myself. I can't wait to learn more about you, in the meantime, here some fun facts about me!"
    );

    private static final List<CascadeCard> ABOUT_STORIES = List.of(
            new CascadeCard(
                    "/images/about-married.jpg",
                    "Temple grounds at sunset.",
                    "Family",
                    "I've been married to my wife for over 5 years. With our toddler to boot! We love going on adventures all across the country. Hiking, sight seeing, and learning!",
                    false,
                    "",
                    "",
                    ""
            ),
            new CascadeCard(
                    "/images/about-community.jpg",
                    "Pokemon GO players gathered at a stadium event.",
                    "Community",
                    "I've always been invested in my local community. I currently lead a group of over 3,000 people where we come together and engage with other members of our neighbors.",
                    true,
                    "",
                    "",
                    ""
            ),
            new CascadeCard(
                    "/images/about-hobbies.jpg",
                    "Collection of game consoles and controllers.",
                    "Hobbies",
                    "I'm a huge fan of video games and their history. I have pretty much every console, and I love tinkering with them to bring out their full potential!",
                    false,
                    "",
                    "",
                    ""
            )
    );

    private static final PageFeature PROJECTS_FEATURE = new PageFeature(
            "/images/carousel-projects.png",
            "Projects illustration",
            "",
            "My Personal Projects",
            "Below are some projects I've worked on in my free time. Feel free to click on them to go to the " +
                    "project Github repo and learn more about them!"
    );

    private static final List<CascadeCard> PROJECT_CARDS = List.of(
            new CascadeCard(
                    "/images/your-story.gif",
                    "An open book with a question mark on its pages.",
                    "Your Story",
                    "The first instance of me studying AI in college in 2018. " +
                            "A web application for brainstorming and then creating stories.",
                    false,
                    "Web application",
                    "https://github.com/Heroice18/Your-Story",
                    "View Your Story on GitHub"
            ),
            new CascadeCard(
                    "/images/shiny-automation.jpeg",
                    "A blue shiny Pokemon in a grassy scene with sparkles.",
                    "Pokemon Shiny Automation Tool",
                    "A Python tool that monitors a program to identify when a goal is acheived.",
                    true,
                    "Python",
                    "https://github.com/Heroice18/shinyAutomation",
                    "View Pokemon Shiny Automation Tool on GitHub"
            ),
            new CascadeCard(
                    "/images/tag-android.jpg",
                    "A phone displaying a map with a location marker.",
                    "TAG-Andoid",
                    "A Kotlin/Android application TAG! A location in your area to share it with your community. Where it be a piece of artwork," +
                            "a public restroom, or local events.",
                    false,
                    "Kotlin / Android",
                    "https://github.com/Heroice18/TAG-Andoid",
                    "View TAG-Andoid on GitHub"
            ),
            new CascadeCard(
                    "/images/wrestling-plus.jpeg",
                    "Good luck wrestlers graphic with two wrestlers.",
                    "Wrestling-Plus",
                    "My first Java project in college utilizing Gradle working with a local wrestling group to track and update " +
                            "wrestling tournaments.",
                    true,
                    "Java",
                    "https://github.com/Heroice18/Wrestling-Plus",
                    "View Wrestling Plus on GitHub"
            )
    );

    private static final List<LinkedInPost> LINKEDIN_POSTS = List.of(
            new LinkedInPost("https://www.linkedin.com/embed/feed/update/urn:li:share:7511795608110813185?collapsed=1", 630),
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
        model.addAttribute("pageFeature", ABOUT_FEATURE);
        model.addAttribute("cascadeCards", ABOUT_STORIES);
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
        model.addAttribute("pageFeature", PROJECTS_FEATURE);
        model.addAttribute("cascadeCards", PROJECT_CARDS);
        return "projects";
    }

    @GetMapping("/technologies")
    public String technologies(Model model) {
        model.addAttribute("title", "Technologies | Brandon");
        model.addAttribute("page", "Technologies");
        return "technologies";
    }
}
