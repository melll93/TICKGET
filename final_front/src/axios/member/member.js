import axios from "axios";

export const searchById = async (memberId) => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888" + "/member/searchById",
    params: {
      memberId,
    },
  }).then((res) => res.data);

  return result;
};
