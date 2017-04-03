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

import com.sadetec.model.Product;
import com.sadetec.repository.ProductRepository;
import com.sadetec.rest.support.AutoCompleteQuery;

@RestController
@RequestMapping("/api/products")
public class ProductResource {

	private final Logger log = LoggerFactory.getLogger(ProductResource.class);

	@Autowired
	private ProductRepository productRepository;

	/**
	 * Create a new Product.
	 */
	@RequestMapping(value = "/", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Product> create(@RequestBody Product product) throws URISyntaxException {

		log.debug("Create Product : {}", product);

		if (product.isIdSet()) {
			return ResponseEntity.badRequest().header("Failure", "Cannot create Product with existing ID").body(null);
		}

		Product result = productRepository.save(product);

		return ResponseEntity.created(new URI("/api/products/" + result.getId())).body(result);
	}

	/**
	 * Find by id Product.
	 */
	@RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Product> findById(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Find by id Product : {}", id);

		return Optional.ofNullable(productRepository.findOne(id)).map(product -> new ResponseEntity<>(product, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Update Product.
	 */
	@RequestMapping(value = "/", method = PUT, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Product> update(@RequestBody Product product) throws URISyntaxException {

		log.debug("Update product : {}", product);

		if (!product.isIdSet()) {
			return create(product);
		}

		Product result = productRepository.save(product);

		return ResponseEntity.ok().body(result);
	}

	/**
	 * Find a Page of Product using query by example.
	 */
	@RequestMapping(value = "/page", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Product>> findAll(@RequestBody Pageable prbe) throws URISyntaxException {
		Page<Product> pageResponse = productRepository.findAll(prbe);
		return new ResponseEntity<>(pageResponse, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * Auto complete support.
	 */
	@RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Product>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

		List<Product> results = productRepository.complete(acq.query, acq.maxResults);

		return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * Delete by id Product.
	 */
	@RequestMapping(value = "/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> delete(@PathVariable Integer id) throws URISyntaxException {

		log.debug("Delete by id Product : {}", id);

		try {
			productRepository.delete(id);
			return ResponseEntity.ok().build();
		}
		catch (Exception x) {
			// todo: dig exception, most likely
			// org.hibernate.exception.ConstraintViolationException
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
}