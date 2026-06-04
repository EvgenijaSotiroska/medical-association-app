package medical.association.backend.config;

import java.util.List;

import medical.association.backend.web.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtWebSecurityConfig {
    private final JwtFilter jwtFilter;

    public JwtWebSecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173","https://medical-association-app.vercel.app"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
                .role("ADMINISTRATOR").implies("USER")
                .build();
    }

    @Bean
    static MethodSecurityExpressionHandler methodSecurityExpressionHandler(RoleHierarchy roleHierarchy) {
        DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy);
        return expressionHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsCustomizer ->
                        corsCustomizer.configurationSource(corsConfigurationSource())
                )
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )
                .authorizeHttpRequests(authorizeHttpRequestsCustomizer ->
                        authorizeHttpRequestsCustomizer
                                .requestMatchers(
                                        "/swagger-ui/**",
                                        "/v3/api-docs/**",
                                        "/api/user/register",
                                        "/api/user/login",
                                        "/api/user/forgot-password",
                                        "/api/user/reset-password"
                                )
                                .permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/events/my-events/*")
                                .authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/publications/**")
                                .authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/publications")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.PUT, "/api/publications/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.DELETE, "/api/publications/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.GET, "/api/events/*/is-registered/*")
                                .authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/events/*/registrations")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.POST, "/api/events/*/register/*")
                                .authenticated()
                                .requestMatchers(HttpMethod.DELETE, "/api/events/*/cancel/*")
                                .authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/events/**")
                                .authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/events/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.PUT, "/api/events/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(HttpMethod.DELETE, "/api/events/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers("/api/memberProfiles/**")
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers("/api/profile/**")
                                .authenticated()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(sessionManagementConfigurer ->
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
