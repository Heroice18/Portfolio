package com.example.portfolio;

public record CascadeCard(
        String image,
        String imageAlt,
        String heading,
        String description,
        boolean reverse,
        String category,
        String link,
        String linkText
) {
}
