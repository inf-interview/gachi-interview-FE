const getWorkbookList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/workbook/list`);
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
