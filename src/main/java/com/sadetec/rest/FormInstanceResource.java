/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/rest/EntityResource.java.e.vm
 */
package com.sadetec.rest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sadetec.model.FormInstance;
import com.sadetec.model.ManualProductMap;
import com.sadetec.repository.FormInstanceRepository;
import com.sadetec.rest.support.AutoCompleteQuery;
import com.sadetec.rest.support.PageResponse;

@RestController
@RequestMapping("/api/formInstance")
public class FormInstanceResource {

    private final Logger log = LoggerFactory.getLogger(FormInstanceResource.class);

    @Autowired
    private FormInstanceRepository formInstanceRepository;

    @Autowired
	private ObjectMapper objectMapper;

    /**
     * Create a new FormInstance.
     */
    @RequestMapping(value = "/", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<FormInstance> create(@RequestBody FormInstance formInstanceDTO) throws URISyntaxException {

        log.debug("Create FormInstance : {}", formInstanceDTO);

        if (formInstanceDTO.isIdSet()) {
            return ResponseEntity.badRequest().header("Failure", "Cannot create FormInstance with existing ID").body(null);
        }

        FormInstance result = formInstanceRepository.save(formInstanceDTO);

        return ResponseEntity.created(new URI("/api/formInstances/" + result.getId())).body(result);
    }

    /**
    * Find by id FormInstance.
    */
    @RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<FormInstance> findById(@PathVariable Integer id) throws URISyntaxException {

        log.debug("Find by id FormInstance : {}", id);

        return Optional.ofNullable(formInstanceRepository.findOne(id)).map(formInstanceDTO -> new ResponseEntity<>(formInstanceDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Update FormInstance.
     */
    @RequestMapping(value = "/update", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<PageResponse<FormInstance>> update(@RequestBody String json) throws URISyntaxException {

		log.debug("Update by id FormInstance : {}", json);
		PageResponse<FormInstance> pageResponse = new PageResponse<FormInstance>(null);
		TypeReference<List<FormInstance>> typeRef = new TypeReference<List<FormInstance>>() {
		};
		try {
			JsonNode root = objectMapper.readTree(json);
			JsonNode tempNode = root.get("data");
			if (tempNode.isArray()) {
				List<FormInstance> temps = objectMapper.convertValue(tempNode, typeRef);
				for (Iterator<FormInstance> ketIter = temps.iterator(); ketIter.hasNext();) {
					FormInstance tempObj = ketIter.next();
					formInstanceRepository.save(tempObj);
				}
			}
			else {
				FormInstance tempObj = objectMapper.convertValue(tempNode, FormInstance.class);
				formInstanceRepository.save(tempObj);
			}

			pageResponse.setSuccess(Boolean.TRUE);
			pageResponse.setMessage("Update FormInstance Success");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			pageResponse.setSuccess(Boolean.FALSE);
			pageResponse.setMessage("Update FormInstance Failure");
			return new ResponseEntity<PageResponse<FormInstance>>(pageResponse, HttpStatus.OK);
		}

	}

    /**
     * Find a Page of FormInstance using query by example.
     */
    @RequestMapping(value = "/page", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<FormInstance>> findAll(@RequestBody Pageable prbe) throws URISyntaxException {
        Page<FormInstance> pageResponse = formInstanceRepository.findAll(prbe);
        return new ResponseEntity<>(pageResponse, new HttpHeaders(), HttpStatus.OK);
    }

    /**
    * Auto complete support.
    */
    @RequestMapping(value = "/complete", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FormInstance>> complete(@RequestBody AutoCompleteQuery acq) throws URISyntaxException {

        List<FormInstance> results = formInstanceRepository.complete(acq.query, acq.maxResults);

        return new ResponseEntity<>(results, new HttpHeaders(), HttpStatus.OK);
    }

    /**
     * Delete by id FormInstance.
     */
    @RequestMapping(value = "/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> delete(@PathVariable Integer id) throws URISyntaxException {

        log.debug("Delete by id FormInstance : {}", id);

        try {
            formInstanceRepository.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception x) {
            // todo: dig exception, most likely org.hibernate.exception.ConstraintViolationException
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}