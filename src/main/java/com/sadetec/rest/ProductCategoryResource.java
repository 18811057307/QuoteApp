package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sadetec.model.ProductCategory;
import com.sadetec.repository.ProductCategoryRepository;
import com.sadetec.rest.support.AutoCompleteQuery;

@RestController
@RequestMapping("/api/productCategories")
public class ProductCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryResource.class);

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    /**
     * Create a new ProductCategory.
     */
    @RequestMapping(value = "/", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductCategory> create(@RequestBody ProductCategory productCategory) throws URISyntaxException {

        log.debug("Create ProductCategory : {}", productCategory);

        if (productCategory.isIdSet()) {
            return ResponseEntity.badRequest().header("Failure", "Cannot create ProductCategory with existing ID").body(null);
        }

        ProductCategory result = productCategoryRepository.save(productCategory);

        return ResponseEntity.created(new URI("/api/productCategories/" + result.getId())).body(result);
    }

    /**
    * Find by id ProductCategory.
    */
    @RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductCategory> findById(@PathVariable Integer id) throws URISyntaxException {

        log.debug("Find by id ProductCategory : {}", id);

        return Optional.ofNullable(productCategoryRepository.findOne(id)).map(productCategoryDTO -> new ResponseEntity<>(productCategoryDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Update ProductCategory.
     */
    @RequestMapping(value = "/", method = PUT, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductCategory> update(@RequestBody ProductCategory productCategoryDTO) throws URISyntaxException {

        log.debug("Update ProductCategoryDTO : {}", productCategoryDTO);

        if (!productCategoryDTO.isIdSet()) {
            return create(productCategoryDTO);
        }

        ProductCategory result = productCategoryRepository.save(productCategoryDTO);

        return ResponseEntity.ok().body(result);
    }

    /**
     * Find a Page of ProductCategory using query by example.
     */
    @RequestMapping(value = "/page", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<ProductCategory>> findAll(@RequestBody Pageable prbe) throws URISyntaxException {
        Page<ProductCategory> pageResponse = productCategoryRepository.findAll(prbe);
        return new ResponseEntity<>(pageResponse, new HttpHeaders(), HttpStatus.OK);
    }

    /**
    * Auto complete support.
    */
    @RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProductCategory>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

        List<ProductCategory> results = productCategoryRepository.complete(acq.query, acq.maxResults);

        return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
    }

    /**
     * Delete by id ProductCategory.
     */
    @RequestMapping(value = "/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> delete(@PathVariable Integer id) throws URISyntaxException {

        log.debug("Delete by id ProductCategory : {}", id);

        try {
            productCategoryRepository.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception x) {
            // todo: dig exception, most likely org.hibernate.exception.ConstraintViolationException
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}