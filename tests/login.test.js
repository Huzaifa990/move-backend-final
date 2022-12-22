const request = require("request");
const assert = require("assert");

describe("Login API", () => {
  it("User able to login with correct credentials", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/login",
        form: {
          email: "moaz-ahmed@outlook.com",
          password: "Admin@123",
        },
      },
      (err, res, body) => {
        assert.equal(res.statusCode, 200);
        done();
      }
    );
  });

  it("User not able to login with incorrect credentials", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/login",
        form: {
          email: "moaz-ahmed@outlook.com",
          password: "Admin@12345",
        },
      },
      (err, res, body) => {
        assert.notEqual(res.statusCode, 200);
        done();
      }
    );
  });
});

// ----- UPDATE PASSWORD TESTING -----

const currentPassword = "Admin@123";
const newPassword = "Admin@1234";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2EwN2EwZmNlODc3ZGJkODlkY2I4MTgiLCJuYW1lIjoiTW9heiBBaG1lZCIsImFjY291bnRUeXBlIjoiTGVzc2VlIiwiZW1haWwiOiJtb2F6LWFobWVkQG91dGxvb2suY29tIiwiaWF0IjoxNjcxNzM5MTE3LCJleHAiOjE2NzE5OTgzMTd9.2vjX5SQ6t6tSOOglYOHTtOtrclJWLFyqxbtVYnX2wi8";

describe("updatePassword", () => {
  it("should return 401 if no token is found", (done) => {
    request.put(
      {
        url: "http://localhost:8080/api/auth/updatePassword",
        form: {
          _id: "randomInvalidID",
          password: "oldPassword",
          newPassword: "newPassword",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 401);
        assert.strictEqual(body, '{"msg":"Login Required!"}');
        done();
      }
    );
  });

  it("should return 402 if password is invalid", (done) => {
    request.put(
      {
        url: "http://localhost:8080/api/auth/updatePassword",
        form: {
          password: "Admin@113",
          newPassword: "Admin@123",
          confirmNewPassword: "Admin@123",
        },
        headers: {
          Authorization: authToken,
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 402);
        assert.strictEqual(body, '{"msg":"Invalid Current Password Entered!"}');
        done();
      }
    );
  });

  it("should return 200 if update is successful", (done) => {
    request.put(
      {
        url: "http://localhost:8080/api/auth/updatePassword",
        form: {
          password: "Admin@123",
          newPassword: "Admin@123",
          confirmNewPassword: "Admin@123",
        },
        headers: {
          Authorization: authToken,
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(body, '{"msg":"Password Updated Successfully."}');
        done();
      }
    );
  });
});
