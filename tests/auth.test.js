const request = require("request");
const assert = require("assert");

describe("Sign up", () => {
  it("Fails if email already exists", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/sign-up",
        form: {
          name: "Moaz Ahmed",
          email: "moaz-ahmed@outlook.com",
          password: "Admin@123",
          confirmPassword: "Admin@123",
          accountType: "Lessee",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 402);
        done();
      }
    );
  });

  it("Fails if passwords do not match", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/sign-up",
        form: {
          name: "Moaz Ahmed",
          email: "moaz-ahmed-random@outlook.com",
          password: "Admin@123",
          confirmPassword: "Admin@124",
          accountType: "Lessee",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 401);
        done();
      }
    );
  });

  it("Success in case everything is fine", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/sign-up",
        form: {
          name: "Moaz Ahmed",
          email: "moaz-ahmed-test@outlook.com",
          password: "Admin@123",
          confirmPassword: "Admin@123",
          accountType: "Lessee",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });
});

// Test login API
describe("Login", () => {
  // Test login with correct credentials
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

  // Test login with incorrect credentials
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

// Variables for testing updatePassword
const currentPassword = "Admin@123";
const newPassword = "Admin@1234";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2EwN2EwZmNlODc3ZGJkODlkY2I4MTgiLCJuYW1lIjoiTW9heiBBaG1lZCIsImFjY291bnRUeXBlIjoiTGVzc2VlIiwiZW1haWwiOiJtb2F6LWFobWVkQG91dGxvb2suY29tIiwiaWF0IjoxNjcyMzUwMDA4LCJleHAiOjE2NzI2MDkyMDh9.SBpSYBi7bWnhA76gnhWuUjmzHjv_RFy-ziHZpI87X_0";

const lessorToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E5ZGZkZTUzMzQxMjkyMDU4ZWI0ODUiLCJuYW1lIjoiTGVzc29yIDEiLCJhY2NvdW50VHlwZSI6Ikxlc3NvciIsImVtYWlsIjoibGVzc29yMUBvdXRsb29rLmNvbSIsImlhdCI6MTY3MjM1MTc4MiwiZXhwIjoxNjcyNjEwOTgyfQ.oSurOLU4nIxiqYPIRsPVDSGQwAtvdaCmwH3HAqHpaXU";

// Test updatePassword API
describe("Update Password", () => {
  // Test handling of missing token
  it("Token not found", (done) => {
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

  // Test handling of invalid password
  it("Invalid Current Password", (done) => {
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

  // Test successful update of password
  it("New passwords do not match", (done) => {
    request.put(
      {
        url: "http://localhost:8080/api/auth/updatePassword",
        form: {
          password: "Admin@123",
          newPassword: "Admin@1234",
          confirmNewPassword: "Admin@123",
        },
        headers: {
          Authorization: authToken,
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 422);
        assert.strictEqual(body, '{"error":{"confirmNewPassword":"Passwords Do Not Match"}}');
        done();
      }
    );
  });

  // Test successful update of password
  it("Update Successful", (done) => {
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

describe("Forgot password", () => {
  it("should return 404 if no user is found", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/forgotPassword",
        form: {
          email: "invalid@outlook.com",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 404);
        assert.strictEqual(body, '{"msg":"No User Found!"}');
        done();
      }
    );
  });

  it("should return 200 if email is sent successfully", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/auth/forgotPassword",
        form: {
          email: "moaz-ahmed@outlook.com",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(body, '{"msg":"Emai Sent Successfully","emailSent":true}');
        done();
      }
    );
  });
});

describe("Reset password", () => {
  it("should return 422 if OTP link has expired", (done) => {
    request(
      {
        method: "PUT",
        url: "http://localhost:8080/api/auth/setPassword",
        form: {
          otp: "123456",
          password: "Admin@123",
          confirmPassword: "Admin@123",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 422);
        done();
      }
    );
  });
});

describe("Contact Us", () => {
  it("Sends an email to the correct recipient with the correct subject and message", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/contact",
        form: {
          name: "John Smith",
          email: "john.smith@example.com",
          subject: "Inquiry about car rentals",
          message:
            "Hello, I have a few questions about your car rental services. Could you please provide more information?",
        },
      },
      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });
});

describe("Bookings", () => {
  it("Add A New Bookings", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/booking",
        form: {
          car: "6387c482c70acbf1fa018f6b",
          pickupDate: "2033-01-20T09:00Z",
          dropOffDate: "2033-01-22T23:00Z",
          paymentMethod: "COD",
        },
        headers: {
          Authorization: authToken,
        },
      },

      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });
});

describe("Listing", () => {
  it("Get All Listings - Returns all listings in the database", (done) => {
    request(
      {
        method: "GET",
        url: "http://localhost:8080/api/listing",
        headers: {
          Authorization: authToken,
        },
      },

      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });

  it("Add A New Listing", (done) => {
    request(
      {
        method: "POST",
        url: "http://localhost:8080/api/listing",
        form: {
          carName: "Testing",
          company: "Honda",
          model: 2019,
          mileage: 35000,
          transmission: "manual",
          location: "Lahore",
          rentPerDay: 3000,
          picture: [
            "data:image/jpeg;base64,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",
          ],
        },
        headers: {
          Authorization: lessorToken,
        },
      },

      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });

  it("Get My Listings", (done) => {
    request(
      {
        method: "GET",
        url: "http://localhost:8080/api/listing/my-listings",
        headers: {
          Authorization: lessorToken,
        },
      },

      (err, res, body) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      }
    );
  });
});
