import axios from "axios";
import type { RequestDonationDto } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createRequestDonationApi(
  data: RequestDonationDto,
  token: string
) {
  const response = await axios.post(`${baseUrl}/api/request-donation`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
  return response.data;
}
