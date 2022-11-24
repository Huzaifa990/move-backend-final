"use-strict";
const mongoose = require("mongoose");

const Candidate = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    profilePublicView: { type: Boolean },
    emailAlerts: { type: Boolean },
    profileCompletion: { type: Number },
    profileStatuses: [Boolean],
    resume: { type: String },
    verifications: { type: Number },
    personalInfo: {
      contactDetail: {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
      },
      desiredPosition: {
        firstChoice: { type: String },
        secondChoice: { type: String },
        disciplines: [String],
      },
      languages: [
        {
          name: { type: String },
          fluency: { type: String },
        },
      ],
      passportVisaInformation: {
        passports: [
          {
            issuerCountry: { type: String },
            expiry: { type: Date },
          },
        ],
        visa: [String],
      },
      personalInformation: {
        dateOfBirth: { type: Date },
        gender: { type: String },
        nationality: [String],
        smoker: { type: String },
        visibleTattoos: { type: String },
        lookingForLiveInPosition: { type: String },
      },
      teamStatus: {
        maritalStatus: { type: String },
        lookingForWorkAsCouple: { type: String },
        partnerEmail: { type: String },
        requestedPartnerVerification: { type: String },
      },
    },
    aboutMe: {
      about: {
        type: String,
      },
      aboutMeAnother: {
        language: {
          type: String,
        },
        text: {
          type: String,
        },
      },
      hobbiesInterests: {
        type: String,
      },
      hobbiesInterestsAnother: {
        language: {
          type: String,
        },
        text: {
          type: String,
        },
      },
    },
    availabilityInfo: {
      availability: {
        type: String,
      },
      currentCountry: {
        type: String,
      },
      currentLocation: {
        type: String,
      },
    },
    experience: {
      totalExperienceDurationMonths: { type: Number },
      generalExperience: [
        {
          name: { type: String },
          duration: { type: String },
        },
      ],
      experienceLevel: [
        {
          name: { type: String },
          experienceLevel: { type: String },
          experienceType: { type: String },
        },
      ],
      experiences: [
        {
          startDate: {
            type: Date,
          },
          endDate: {
            type: Date,
          },
          stillEmployed: {
            type: Boolean,
          },
          nameOfCompany: {
            type: String,
          },
          levelOfOperation: {
            type: String,
          },
          sizeOfCompany: {
            type: Number,
          },
          numberOfHorses: {
            type: Number,
          },
          positionRole: {
            type: String,
          },
          description: {
            type: String,
          },
        },
      ],
    },
    skillsDriverLicense: {
      licenses: {
        driverLicense: {
          type: String,
        },
        BLicense: {
          type: String,
        },
        BELicense: {
          type: String,
        },
        HGV: {
          type: String,
        },
        HGVAndTrailer: {
          type: String,
        },
        code95: {
          type: String,
        },
      },
      skills: {
        clipping: {
          type: String,
        },
        longing: {
          type: String,
        },
        longReining: {
          type: String,
        },
        handlingStallion: {
          type: String,
        },
        handlingYoungHorses: {
          type: String,
        },
        exerciseRiding: {
          type: String,
        },
        hacking: {
          type: String,
        },
        breakingIn: {
          type: String,
        },
        FEIExperience: {
          type: String,
        },
        teaching: {
          type: String,
        },
        braiding: {
          type: String,
        },
        bandaging: {
          type: String,
        },
        carriageDriving: {
          type: String,
        },
        jumpSchool: {
          type: String,
        },
        courseBuilding: {
          type: String,
        },
        barnManagement: {
          type: String,
        },
        eventManagement: {
          type: String,
        },
        equineFirstAid: {
          type: String,
        },
        travelWithHorses: {
          type: String,
        },
        logisticsPlanning: {
          type: String,
        },
        transportingHorses: {
          type: String,
        },
        entries: {
          type: String,
        },
        equinePaperwork: {
          type: String,
        },
        championship: {
          type: String,
        },
        sales: {
          type: String,
        },
        computerSkills: {
          type: String,
        },
        marketing: {
          type: String,
        },
        socialMedia: {
          type: String,
        },
      },
    },
    diplomaCertifications: {
      education: String,
      certifications: [
        {
          title: { type: String },
          issuedBy: { type: String },
          issueDate: { type: Date },
          url: { type: String },
        },
      ],
    },
    references: [
      {
        name: { type: String },
        relationship: { type: String },
        companyName: { type: String },
        type: { type: String },
        phone: { type: String },
        email: { type: String },
        url: { type: String },
        verified: { type: Boolean },
        denied: { type: Boolean },
      },
    ],
    uploads: {
      mainPhoto: { type: String },
      video: { type: String },
      partnerCV: { type: String },
      additionalFiles: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", Candidate);
