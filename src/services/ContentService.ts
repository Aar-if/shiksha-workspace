import { post } from "./RestClient";
import axios from 'axios';
const authToken = process.env.NEXT_PUBLIC_AUTH_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const defaultReqBody = {
  request: {
    filters: {
      primaryCategory: [
        "Course Assessment",
        "eTextbook",
        "Explanation Content",
        "Learning Resource",
        "Practice Question Set",
        "Teacher Resource",
        "Exam Question",
        "Content Playlist",
        "Course",
        "Digital Textbook",
        "Question paper",
      ],
    },
    query: "",
    sort_by: {
      lastUpdatedOn: "desc",
    },
  },
};

const getReqBodyWithStatus = (status: string[]) => {
  return {
    ...defaultReqBody,
    request: {
      ...defaultReqBody.request,
      filters: {
        ...defaultReqBody.request.filters,
        status,
      },
    },
  };
};

export const getContent = async (status: string[]) => {
  const apiURL = "/action/composite/v3/search";
  try {
    const reqBody = getReqBodyWithStatus(status);
    const response = await post(apiURL, reqBody);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};




export const createQuestionSet = async () => {
  const apiURL = `action/questionset/v2/create`;
  const reqBody = {
    request: {
      questionset: {
        name: "Untitled QuestionSet",
        mimeType: "application/vnd.sunbird.questionset",
        primaryCategory: "Practice Question Set",
        code: "de1508e3-cd30-48ba-b4de-25a98d8cfdd2"
      }
    }
  };


  try {
    const response = await axios.post(apiURL, reqBody, {
      headers: {
        'Content-Type': 'application/json',
        'tenantId': 'ef99949b-7f3a-4a5f-806a-e67e683e38f3',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
