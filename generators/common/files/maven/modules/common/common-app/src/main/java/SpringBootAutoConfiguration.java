package <%= groupId %>.common.app;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import <%= groupId %>.common.domain.UseCase;

@AutoConfiguration
@ComponentScan(
        basePackages = {"<%= groupId %>.*"},
        includeFilters = {
                @ComponentScan.Filter(
                        type = FilterType.ANNOTATION,
                        value = {UseCase.class}),
        })
public class SpringBootAutoConfiguration {
}