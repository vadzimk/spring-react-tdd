package com.hoxify.hoxify;
import static org.assertj.core.api.Assertions.assertThat;

import com.hoxify.hoxify.shared.GenericResponse;
import com.hoxify.hoxify.user.User;
import com.hoxify.hoxify.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.GeneratedValue;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {
    private static final String API_1_0_USERS = "/api/1.0/users";
    @Autowired
    TestRestTemplate testRestTemplate;  // http client to send user object to backend

    @Autowired
    UserRepository userRepository;

    @Before
    public void cleanUp(){
        userRepository.deleteAll();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk(){
        User user = createValidUser();

        // post user object to the server
        ResponseEntity<Object> response = testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class); // endpoint, objToSend, responseObjType
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    private User createValidUser() {
        User user = new User();
        user.setUsername("test-user"); // at least 4 ch
        user.setDisplayName("test-display"); // at least 4 ch
        user.setPassword("P4ssword"); // 1 upper, 1 lower, 1 number, 8 ch
        return user;
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase(){
        User user = createValidUser();
        testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage(){
        User user = createValidUser();
        ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_1_0_USERS, user, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull(); // when empby body is mapped to getBody it will be null and we get nullPointerException
    }

    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase(){
        User user = createValidUser();
        testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class);
        List<User> users = userRepository.findAll();
        User indb = users.get(0);
        System.out.println("user.password " + user.getPassword());
        System.out.println("indb.password " + indb.getPassword());
        assertThat(indb.getPassword()).isNotEqualTo(user.getPassword());
    }

}
