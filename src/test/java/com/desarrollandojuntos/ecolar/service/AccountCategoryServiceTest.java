package com.desarrollandojuntos.ecolar.service;

import com.desarrollandojuntos.ecolar.EcolarApp;
import com.desarrollandojuntos.ecolar.config.Constants;
import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.domain.User;
import com.desarrollandojuntos.ecolar.repository.UserRepository;
import com.desarrollandojuntos.ecolar.service.dto.UserDTO;
import com.desarrollandojuntos.ecolar.service.impl.AccountCategoryServiceImpl;
import com.desarrollandojuntos.ecolar.service.util.RandomUtil;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Test class for the UserResource REST controller.
 *
 * @see UserService
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class AccountCategoryServiceTest {

    private final Logger log = LoggerFactory.getLogger(AccountCategoryServiceTest.class);

	
    @Autowired
    private AccountCategoryService accountCategoryService;

    private User user;

    @Before
    public void init() {
    }

    @Test
    public void testCreateRootAccountCategory() {
    	AccountCategory root = accountCategoryService.getRootAccountCategoryDocument();
    	AccountCategory gastos = new AccountCategory().name("Gastos").description("Gastos");
    	AccountCategory ingresos = new AccountCategory().name("Ingresos").description("Ingresos");
    	AccountCategory alimentacion = new AccountCategory().name("Alimentacion").description("Alimentacion");
    	gastos.getCategories().add(alimentacion);
    	root.getCategories().add(gastos);
    	root.getCategories().add(ingresos);
    	
    	alimentacion = accountCategoryService.save(alimentacion);
    	gastos = accountCategoryService.save(gastos);
    	ingresos = accountCategoryService.save(ingresos);
    	root = accountCategoryService.save(root);
    	
    	log.info(ToStringBuilder.reflectionToString(root, ToStringStyle.MULTI_LINE_STYLE));
    	
    	AccountCategory child = accountCategoryService.findChildInRootCategory(root, alimentacion.getId());
    	log.info(ToStringBuilder.reflectionToString(child, ToStringStyle.MULTI_LINE_STYLE));
    }

    @Test
    public void testCreateAccountCategory() {
    	AccountCategory result = accountCategoryService.save(new AccountCategory().name("Nombre").description("Descripcion"));
    	assertNotNull(result);
    	log.info(ToStringBuilder.reflectionToString(result, ToStringStyle.MULTI_LINE_STYLE));
    	AccountCategory root = accountCategoryService.getRootAccountCategoryDocument();
    	log.info(ToStringBuilder.reflectionToString(root, ToStringStyle.MULTI_LINE_STYLE));
    }

}
