interface getQuestionsProps {
  workbookId: number;
}

const getQuestions = async ({ workbookId }: getQuestionsProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/workbook/${workbookId}/question/list`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getQuestions;
