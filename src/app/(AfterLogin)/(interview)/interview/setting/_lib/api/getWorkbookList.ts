const getWorkbookList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken") || "";
    const refreshToken = localStorage.getItem("refreshToken") || "";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken,
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/workbook/list`, options);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getWorkbookList;
