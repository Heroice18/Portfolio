package com.example.portfolio;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI portfolioOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Brandon's Portfolio API")
                        .description("API documentation for Brandon's portfolio application.")
                        .version("0.0.1-SNAPSHOT"));
    }
}